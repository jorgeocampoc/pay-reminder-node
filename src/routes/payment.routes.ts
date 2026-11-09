import { Router } from "express";
import { getPaymentsService } from "../controllers/index.js";
import {
  ensureResourceExists,
  isActiveUser,
  validToken,
} from "../middlewares/index.js";
import { MODELS, RESOURCE_SOURCE } from "../constants/index.js";
import { postPayment } from "../controllers/payment.controller.js";

const paymentRoutes = Router();

paymentRoutes.get("/:id", [validToken, isActiveUser], getPaymentsService);
paymentRoutes.post(
  "/:id",
  [
    validToken,
    isActiveUser,
    ensureResourceExists(MODELS.payment, "id", RESOURCE_SOURCE.params),
  ],
  postPayment,
);
export default paymentRoutes;
