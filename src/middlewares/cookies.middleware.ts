import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env, QueryTypes, sequelize } from "../config/index.js";
import { getPathUser, responseApi } from "../utils/index.js";
import { AUTH_MESSAGE } from "../constants/index.js";
import type { TokenSign, UserFoundAuthSchema } from "../types/index.js";
const findSessionUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["access-token"];
  if (!token) return next();
  try {
    const { email, password } = req.body;
    const user = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as TokenSign;
    const { sub, role } = user;
    const userFound = (await sequelize.query(
      `
    SELECT id, email, role, is_active
    FROM users
    WHERE email = $email
    AND password = crypt($password, password)
    AND id = $sub
    LIMIT 1`,
      {
        bind: { email, password, sub },
        type: QueryTypes.SELECT,
        plain: true,
      },
    )) as UserFoundAuthSchema | null;
    if (!userFound) {
      responseApi(res, 404, AUTH_MESSAGE.CREDENTIALS);
      return;
    }

    const path = getPathUser(role);
    responseApi(res, 200, AUTH_MESSAGE.isAuthenticated, { path });
  } catch (error) {
    next(error);
  }
};

export { findSessionUser };
