import z from "zod";

const categoryRegisterSchema = z.object({
  name: z.string().trim().min(3).toLowerCase(),
  icon: z.string().trim().min(3).toLowerCase(),
  description: z.string().trim().min(6).toLowerCase().optional(),
});


export { categoryRegisterSchema };
