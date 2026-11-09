import { col, fn, Op, Transaction } from "sequelize";
import Payment from "../models/payment.model.js";
import type {
  PaymentRegisterSchema,
  PaymentSchema,
  StatusPayment,
} from "../types/index.js";
import { AppError } from "../errors/handleError.error.js";
import {  STATUS_PAYENT } from "../constants/index.js";

const generatePaymentsService = async (
  payment: PaymentRegisterSchema,
  transaction: Transaction,
) => {
  const date = new Date(payment.due_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setDate(1)
  if (today >= date) {
    return (await Payment.create(payment, { transaction })).dataValues;
  }
  return null;
};

const findAllPaymentsService = async (
  user_service_id: string,
  status: StatusPayment,
) => {

  
  return await Payment.findAll({
    where: { user_service_id, status },
    attributes: [
      "id",
      "amount",
      "status",
      'is_available',
      [fn("DATE", col("payment_date")), "payment_date"],
      [fn("DATE", col("due_date")), "due_date"],
    ],
  });
};

const markPaymentAsPaid = async (payment: PaymentSchema, t: Transaction) => {
  if (payment.status === STATUS_PAYENT.paid)
    throw new AppError("This payment is already been paid", 409);
  if (!payment.is_available)
    throw new AppError("The payment cannot be paid yet", 409);
  const { id, amount } = payment;
  const today = new Date();
  const [_affectedCount, updatedPayments] = await Payment.update(
    {
      status: STATUS_PAYENT.paid,
      payment_date: today,
      is_available: false,
      amount,
    },
    {
      where: { id },
      returning: true,
      transaction: t,
    },
  );

  return updatedPayments[0]?.dataValues;
};

const updateStatusPayment = async (user_service_id: string, t: Transaction) => {
  const payment = await Payment.findOne({
    where: {
      user_service_id,
      status: {
        [Op.in]: [STATUS_PAYENT.pending, STATUS_PAYENT.overdue],
      },
    },
    order: [["due_date", "ASC"]],
  });
  if (payment)
    await Payment.update(
      { is_available: true },
      { where: { id: payment.dataValues.id }, transaction: t },
    );
};

const updateUnpaidPaymentStatuses = async (
  user_service_id: string,
  t: Transaction,
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const payments = await Payment.findAll({
    where: {
      user_service_id,
      status: STATUS_PAYENT.pending,
    },
  });
  for (let i = 0; i < payments.length; i++) {
    const { id, due_date } = payments[i]?.dataValues;
    const datePayment = new Date(due_date);
    datePayment.setHours(0, 0, 0, 0);
    if (today > datePayment)
      await Payment.update(
        { status: STATUS_PAYENT.overdue },
        { where: { id }, transaction: t },
      );
  }
};

export {
  generatePaymentsService,
  updateUnpaidPaymentStatuses,
  findAllPaymentsService,
  markPaymentAsPaid,
  updateStatusPayment,
};
