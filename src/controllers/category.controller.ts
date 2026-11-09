import type { NextFunction, Request, Response } from "express";
import { responseApi } from "../utils/index.js";
import { SUCCESS_MESSAGE } from "../constants/index.js";
import { findCategories, createCategory } from "../services/index.js";

const registerCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await createCategory(req.body, req);
    responseApi(res, 201, SUCCESS_MESSAGE.created);
  } catch (error) {
    next(error);
  }
};
const getCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    
    const results = await findCategories();
    responseApi(res, 201, SUCCESS_MESSAGE.read, {results});
  } catch (error) {
    next(error);
  }
};




export { registerCategory,getCategories };
