import {
  userServiceRegisterSchema,
  userServiceSchema,
} from "../schemas/index.js";
import z from "zod";
type UserServiceRegisterSchema = z.infer<typeof userServiceRegisterSchema>;
type UserServiceSchema = z.infer<typeof userServiceSchema>;

export type { UserServiceRegisterSchema, UserServiceSchema };
