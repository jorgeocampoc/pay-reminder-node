import z from "zod";
import { ROLES } from "../constants/index.js";

const authSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
const userFoundAuthSchema = authSchema.extend({
  id: z.uuid(),
  role: z.enum([...Object.values(ROLES)]),
  is_active: z.boolean(),
});

export { authSchema, userFoundAuthSchema };
