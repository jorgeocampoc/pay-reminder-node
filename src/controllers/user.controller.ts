import type { NextFunction, Request, Response } from "express";
import { responseApi } from "../utils/index.js";
import { createUser } from "../services/index.js";
import { SUCCESS_MESSAGE } from "../constants/index.js";
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await createUser(req.body);
    responseApi(res, 201, SUCCESS_MESSAGE.created);
  } catch (error) {
    next(error);
  }
};
const uploadImage = async (_req: Request, _res: Response) => {};
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    responseApi(res, 200, SUCCESS_MESSAGE.read, { user });
  } catch (error) {
    next(error);
  }
};

export { registerUser, uploadImage, getUser };
