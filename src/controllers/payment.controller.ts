import type { NextFunction, Request, Response } from "express";
import {
  findAllPaymentsService,
  markPaymentAsPaid,
  updateStatusPayment,
} from "../services/index.js";
import { isStatusPayment, responseApi } from "../utils/index.js";
import {
  ERROR_MESSAGE,
  STATUS_PAYENT,
  SUCCESS_MESSAGE,
} from "../constants/index.js";
import type { StatusPayment } from "../types/index.js";
import { AppError } from "../errors/index.js";
import { sequelize } from "../config/index.js";
const getPaymentsService = async (
  req: Request<{ id: string }, {}, {}, { status?: StatusPayment }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { status = STATUS_PAYENT.pending } = req.query;
    const bandStatus = isStatusPayment(status);
    const results = await findAllPaymentsService(
      id,
      !bandStatus ? STATUS_PAYENT.pending : status,
    );
    
    responseApi(res, 201, SUCCESS_MESSAGE.read, { results });
  } catch (error) {
    next(error);
  }
};

const postPayment = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  if (!req.paymentFound) throw new AppError(ERROR_MESSAGE.notFound, 404);
  const t = await sequelize.transaction();
  try {
    req.paymentFound.amount = req.body?.amount ?? req.paymentFound.amount;
    const updatePayment = await markPaymentAsPaid(req.paymentFound, t);
    await updateStatusPayment(updatePayment.user_service_id, t);
    await t.commit();
    responseApi(res, 200, SUCCESS_MESSAGE.updated);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

export { getPaymentsService, postPayment };
