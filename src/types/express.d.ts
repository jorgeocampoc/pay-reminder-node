import type { PaymentSchema } from "./payment.type.ts";
import type { UserSchema } from "./user.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserSchema;
      paymentFound?: PaymentSchema;
    }
    interface Response {
      sendError(status: number, message: string): this;
    }
  }
}
