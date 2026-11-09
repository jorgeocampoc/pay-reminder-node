import type { Transaction } from "sequelize";
import { ERROR_MESSAGE } from "../constants/index.js";
import { AppError } from "../errors/handleError.error.js";
import Services from "../models/services.model..js";
import type { ServiceRegisterSchema } from "../types/index.js";
const createServicePayment = async (
  service: ServiceRegisterSchema,
  transaction: Transaction,
) => {
  const { name, category_id } = service;
  const enseureServiceExists = await Services.findOne({
    where: { name, category_id },
  });
  if (enseureServiceExists)
    throw new AppError(ERROR_MESSAGE.alreadyExists, 409);
  return (await Services.create(service, { transaction })).dataValues;
};

export { createServicePayment };
