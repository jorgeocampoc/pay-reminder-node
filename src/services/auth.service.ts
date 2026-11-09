import type { Request, Response } from "express";
import { AppError } from "../errors/index.js";
import { AUTH_MESSAGE } from "../constants/index.js";
import { sequelize, QueryTypes } from "../config/index.js";
import type { UserFoundAuthSchema } from "../types/auth.type.js";
import { generateCookiesSession, getPathUser } from "../utils/index.js";

const authService = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = (await sequelize.query(
    `
    SELECT id, email, role, is_active
    FROM users
    WHERE email = $email
    AND password = crypt($password, password)
    LIMIT 1`,
    {
      bind: { email, password },
      type: QueryTypes.SELECT,
      plain: true,
    },
  )) as UserFoundAuthSchema | null;

  if (!user) throw new AppError(AUTH_MESSAGE.CREDENTIALS, 404);
  if (!user.is_active) throw new AppError(AUTH_MESSAGE.NOT_ACTIVED, 403);
  generateCookiesSession(res, user);
  return getPathUser(user.role);
};

export { authService };
