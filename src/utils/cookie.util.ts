import type { Response } from "express";
import type { UserFoundAuthSchema } from "../types/index.js";
import { generateToken } from "./index.js";
import { env } from "../config/index.js";
const generateCookiesSession = (res: Response, user: UserFoundAuthSchema) => {
  const token = generateToken(user);
  res.cookie("access-token", token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  });
};

export { generateCookiesSession };
