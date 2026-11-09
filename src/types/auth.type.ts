import { userFoundAuthSchema } from "../schemas/index.js";
import z from "zod";
type UserFoundAuthSchema = z.infer<typeof userFoundAuthSchema>;
export type { UserFoundAuthSchema };
