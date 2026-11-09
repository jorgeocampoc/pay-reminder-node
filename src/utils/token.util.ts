import { env } from "../config/index.js";
import type { UserFoundAuthSchema } from "../types/index.js";
import jwt from "jsonwebtoken";
const generateToken = (user: UserFoundAuthSchema) => {
  return jwt.sign({ sub: user.id, role: user.role }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export { generateToken };
