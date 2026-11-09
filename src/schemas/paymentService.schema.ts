import z from "zod";
import { FREQUENCY_MONTHS } from "../constants/index.js";
import { isValidDate } from "../utils/index.js";

const paymentServiceRegisterSchema = z.object({
  category_id: z.uuid(),
  name: z.string().trim().min(3).max(50).toLowerCase(),
  description: z.string().trim().toLowerCase().max(100).default("").optional(),
  frequency: z.enum(Object.values(FREQUENCY_MONTHS) as [string, ...string[]]),
  amount: z.coerce
    .number()
    .min(0)
    .max(10000)
    .transform((value) => (Object.is(value, -0) ? 0 : value))
    .default(0)
    .optional(),
  due_date: z.iso.date().refine((date) => {
    return isValidDate(date);
  }),
});

const serviceRegisterSchema = paymentServiceRegisterSchema.pick({
  category_id: true,
  name: true,
  description: true,
});

const userServiceRegisterSchema = paymentServiceRegisterSchema
  .pick({
    due_date: true,
    frequency: true,
    amount: true,
  })
  .extend({
    user_id: z.uuid(),
    service_id: z.uuid(),
  });
const paymentRegisterSchema = paymentServiceRegisterSchema
  .pick({
    amount: true,
    due_date: true,
  })
  .extend({
    user_service_id: z.uuid(),
    is_available: z.boolean(),
  });
const userServiceSchema = paymentServiceRegisterSchema
  .pick({
    amount: true,
    due_date: true,
    frequency:true
  })
  .extend({
    id: z.uuid(),
  });

export {
  paymentServiceRegisterSchema,
  serviceRegisterSchema,
  userServiceRegisterSchema,
  paymentRegisterSchema,
  userServiceSchema
};
