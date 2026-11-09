import type { Request } from "express";
import { Category } from "../models/index.js";
import type { CategoryRegisterSchema } from "../types/index.js";
import { AppError } from "../errors/handleError.error.js";
import { ERROR_MESSAGE } from "../constants/index.js";

const createCategory = async (
  category: CategoryRegisterSchema,
  req: Request,
) => {
  const { name } = req.body;
  const categoryFound = await Category.findOne({ where: { name } });
  if (categoryFound) throw new AppError(ERROR_MESSAGE.alreadyExists, 409);
  await Category.create(category);
};

const findCategories = async () => {
  return await Category.findAll({
    attributes: ["id", "name", "description", "icon"],
  });
};

export { createCategory, findCategories };
