import type { Request, Response, NextFunction } from "express";
import { AppError } from "./index.js";
import { ERROR_MESSAGE } from "../constants/messagesResponse.constant.js";
import { ZodError } from "zod";
import { responseApi } from "../utils/index.js";
import jwt from "jsonwebtoken";
const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(error);
  if (error instanceof jwt.JsonWebTokenError) {
    res.clearCookie("access-token");
    return responseApi(res, 401, error.message);
  }


  if (error instanceof AppError) {
    responseApi(res, error.statusCode, error.message);
    return;
  }
  if (error instanceof ZodError) {
    responseApi(res, 400, ERROR_MESSAGE.invalidData);
    return;
  }

  responseApi(res, 500, ERROR_MESSAGE.internalServer);
};

export { errorHandler };
