import { Op } from "sequelize";
import { AppError } from "../errors/handleError.error.js";
import { Payment, UserService } from "../models/index.js";
import { FREQUENCY_MONTHS_NUMBERS, STATUS_PAYENT } from "../constants/index.js";
import {
  generatePaymentsService,
  updateStatusPayment,
  updateUnpaidPaymentStatuses,
} from "../services/index.js";
import { sequelize } from "../config/index.js";
import type { PaymentRegisterSchema } from "../types/index.js";

const asyncUserPayments = async () => {
  try {
    const userServices = await UserService.findAll();

    for (let i = 0; i < userServices.length; i++) {
      const t = await sequelize.transaction();
      try {
        const { id, due_date, frequency } = userServices[i]?.dataValues;
        const payment = await Payment.findOne({
          where: {
            user_service_id: id,
          },
          order: [["due_date", "DESC"]],
        });
        const due_datePayment = new Date(
          payment?.dataValues.due_date ?? due_date,
        );
        due_datePayment.setHours(0, 0, 0, 0);
        due_datePayment.setMonth(
          due_datePayment.getMonth() + FREQUENCY_MONTHS_NUMBERS[frequency],
        );
        const currentPayment: PaymentRegisterSchema = {
          amount: 0,
          due_date: due_datePayment.toISOString().split("T")[0] ?? "",
          user_service_id: id,
          is_available: false,
        };

        await generatePaymentsService(currentPayment, t);
        await updateStatusPayment(id, t);
        await updateUnpaidPaymentStatuses(id,t)
        await t.commit();
      } catch (error) {
        console.log(error);
        await t.rollback();
      }
    }
  } catch (error) {
    throw new AppError("Error udpated payments", 500);
  }
};

export { asyncUserPayments };
