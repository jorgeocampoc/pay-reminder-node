import type { NextFunction, Request, Response } from "express";
import { responseApi } from "../utils/index.js";
import { ERROR_MESSAGE } from "../constants/index.js";
const isActiveUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user?.is_active)
      return responseApi(res, 200, ERROR_MESSAGE.unauthorized);
    next();
  } catch (error) {
    next(error);
  }
};

export { isActiveUser };
