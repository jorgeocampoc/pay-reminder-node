import { registerUserSchema, userSchema } from "../schemas/index.js";
import z from "zod";
type UserRegister = z.infer<typeof registerUserSchema>;
type UserSchema = z.infer<typeof userSchema>;
export type { UserRegister, UserSchema };
