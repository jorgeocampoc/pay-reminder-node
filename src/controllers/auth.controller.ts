import type { NextFunction, Request, Response } from "express";
import { responseApi } from "../utils/index.js";
import { AUTH_MESSAGE } from "../constants/index.js";
import { authService } from "../services/auth.service.js";
import type { PathUser } from "../types/index.js";
import { env } from "../config/index.js";
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const path = (await authService(req, res)) as PathUser;
    responseApi(res, 200, AUTH_MESSAGE.successfully, { path });
  } catch (error) {
    next(error);
  }
};

const logout = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("access-token", {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    responseApi(res, 200, "Logout successfully");
  } catch (error) {
    next(error);
  }
};

export { auth, logout };
