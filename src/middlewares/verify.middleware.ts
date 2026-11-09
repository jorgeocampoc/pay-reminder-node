import type { Model, ModelStatic } from "sequelize";
import { ERROR_MESSAGE, MODELS, RESOURCE_SOURCE } from "../constants/index.js";
import { AppError } from "../errors/handleError.error.js";
import { Category, User,Payment } from "../models/index.js";
import type { Models, ResourceSource } from "../types/index.js";
import type { NextFunction, Request, Response } from "express";


const ensureResourceExists = (
  model: Models,
  field: string = "",
  source: ResourceSource,
) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const resource = source === RESOURCE_SOURCE.req ? req : req[source];
    const id = resource[field];
    if (!id) throw new AppError("The id is required", 400);
    let modelDB: ModelStatic<Model>;

    switch (model) {
      case MODELS.category:
        modelDB = Category;
        break;
      case MODELS.user:
        modelDB = User;
        break;
      case MODELS.payment:
        modelDB = Payment;
        break;
      default:
        throw new AppError("Invalid model", 400);
    }
    try {
      const resource = await modelDB.findByPk(id);
      if (!resource) throw new AppError(ERROR_MESSAGE.notFound, 404);
      req[`${model}Found`] = resource.dataValues
      next();
    } catch (error) {
      next(error);
    }
  };
};




export { ensureResourceExists };
