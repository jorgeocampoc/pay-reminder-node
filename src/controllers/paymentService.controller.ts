import type { NextFunction, Request, Response } from "express";
import { responseApi } from "../utils/index.js";
import {
  ERROR_MESSAGE,
  FREQUENCY_MONTHS_NUMBERS,
  SUCCESS_MESSAGE,
} from "../constants/index.js";
import {
  createServicePayment,
  createUserService,
  generatePaymentsService,
  getAllUserServices,
} from "../services/index.js";
import {
  serviceRegisterSchema,
  userServiceRegisterSchema,
} from "../schemas/index.js";
import { sequelize } from "../config/index.js";
import { AppError } from "../errors/handleError.error.js";

const registerPaymentService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await sequelize.transaction(async (t) => {
      const service = serviceRegisterSchema.parse(req.body);
      const dataService = await createServicePayment(service, t);
      const { amount, frequency, due_date } = req.body;
      const userService = {
        user_id: req.user?.id,
        service_id: dataService.id,
        amount,
        frequency,
        due_date,
      };
      const userServiceSchema = userServiceRegisterSchema.parse(userService);
      const dataUserService = await createUserService(userServiceSchema, t);
      const newDate = new Date(due_date);
      newDate.setHours(0, 0, 0, 0);
      newDate.setMonth(
        newDate.getMonth() + FREQUENCY_MONTHS_NUMBERS[frequency],
      );
      const payment = {
        amount,
        due_date: newDate.toISOString().split("T")[0] ?? "",
        user_service_id: dataUserService.id,
        is_available: true,
      };

      await generatePaymentsService(payment, t);
    });
    responseApi(res, 201, SUCCESS_MESSAGE.created);
  } catch (error) {
    next(error);
  }
};

const getUserServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw new AppError(ERROR_MESSAGE.forbidden, 401);
    const { id } = req.user;
    const results = await getAllUserServices(id);
    responseApi(res, 200, SUCCESS_MESSAGE.read, { results });
  } catch (error) {
    next(error);
  }
};

export { registerPaymentService, getUserServices };
