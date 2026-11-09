import z from "zod";
import { NAME_REGEX, PASSWORD_REGEX, ROLES } from "../constants/index.js";

const registerUserSchema = z.object({
  first_name: z.string().regex(NAME_REGEX),
  last_name: z.string().regex(NAME_REGEX),
  email: z.email(),
  password: z.string().regex(PASSWORD_REGEX),
  url_img: z.string().trim().min(1).optional(),
  role: z.enum([...Object.values(ROLES)]).optional(),
  is_active: z.boolean().default(true).optional(),
  last_login_at: z.date().optional(),
});

const userSchema = registerUserSchema
  .omit({
    password: true,
    last_login_at: true,
  })
  .extend({ id: z.uuid() });

export { registerUserSchema, userSchema };
