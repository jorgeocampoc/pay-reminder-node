import {
  paymentServiceRegisterSchema,
  serviceRegisterSchema,
} from "../schemas/index.js";

import z from "zod";
type PaymentServiceRegisterSchema = z.infer<
  typeof paymentServiceRegisterSchema
>;
type ServiceRegisterSchema = z.infer<typeof serviceRegisterSchema>;
export type { PaymentServiceRegisterSchema, ServiceRegisterSchema };
