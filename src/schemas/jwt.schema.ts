import z from "zod";
import { ROLES } from "../constants/index.js";

const tokenSign = z.object({
  sub: z.uuid(),
  role: z.enum([...Object.values(ROLES)]),
  iat: z.number(),
  exp: z.number(),
});

export { tokenSign };
