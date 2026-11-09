import type { NextFunction, Request, Response } from "express";
import type { TokenSign } from "../types/index.js";
import { env } from "../config/index.js";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { AppError } from "../errors/handleError.error.js";
import { ERROR_MESSAGE } from "../constants/index.js";
import { userSchema } from "../schemas/index.js";

const validToken = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies["access-token"];
  if (!token) throw new AppError(ERROR_MESSAGE.forbidden, 401);

  try {
    const user = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as TokenSign;
    if (!user) throw new AppError(ERROR_MESSAGE.forbidden, 401);
    const { sub, role } = user;
    const foundUser = await User.findOne({
      where: { id: sub, role },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "url_img",
        "role",
        "is_active",
      ],
    });
    if (!foundUser) {
      throw new AppError(ERROR_MESSAGE.forbidden, 401);
    }
    req.user = userSchema.parse(foundUser.dataValues);
    next();
  } catch (error) {
    next(error);
  }
};

export { validToken };
