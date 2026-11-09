import type { NextFunction, Request, Response } from "express";
import {
  authSchema,
  categoryRegisterSchema,
  paymentServiceRegisterSchema,
  registerUserSchema,
} from "../schemas/index.js";
const validSchemaRegisterUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.body = registerUserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
const validSchemaAuth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = authSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
const validSchemaRegisterCategory = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.body = categoryRegisterSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
const validSchemaPaymentServiceRegister = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.body = paymentServiceRegisterSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validSchemaRegisterUser,
  validSchemaAuth,
  validSchemaPaymentServiceRegister,
  validSchemaRegisterCategory,
};
