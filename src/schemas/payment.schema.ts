import { z } from "zod";
import { STATUS_PAYENT } from "../constants/index.js";

const paymentSchema = z.object({
  id: z.uuid(),
  amount: z.coerce.number().min(0).max(10000).default(0),
  status: z.enum(STATUS_PAYENT).default(STATUS_PAYENT.pending),
  payment_date: z.iso.date().nullable().optional(),
  due_date: z.iso.datetime(),
  is_available: z.boolean().default(false),
  user_service_id: z.uuid().optional(),
});
export { paymentSchema };
