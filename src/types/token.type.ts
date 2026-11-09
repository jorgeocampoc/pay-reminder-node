import z from "zod";
import { tokenSign } from "../schemas/index.js";
type TokenSign = z.infer<typeof tokenSign>;

export type { TokenSign };
