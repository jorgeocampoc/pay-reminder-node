import { paymentRegisterSchema, paymentSchema } from "../schemas/index.js";

import z from "zod";
type PaymentRegisterSchema = z.infer<typeof paymentRegisterSchema>;
type PaymentSchema = z.infer<typeof paymentSchema>;
export type { PaymentRegisterSchema, PaymentSchema };
