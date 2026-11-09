import type { z } from "zod";
import { categoryRegisterSchema } from "../schemas/index.js";

type CategoryRegisterSchema = z.infer<typeof categoryRegisterSchema>;

export type { CategoryRegisterSchema };
