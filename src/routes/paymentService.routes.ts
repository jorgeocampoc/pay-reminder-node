import { Router } from "express";
import {
  registerPaymentService,
  getUserServices,
} from "../controllers/index.js";
import {
  ensureResourceExists,
  isActiveUser,
  validSchemaPaymentServiceRegister,
  validToken,
} from "../middlewares/index.js";
import { MODELS, RESOURCE_SOURCE } from "../constants/index.js";

const paymentServiceRoutes = Router();

paymentServiceRoutes.post(
  "/",
  [
    validToken,
    isActiveUser,
    validSchemaPaymentServiceRegister,
    ensureResourceExists(MODELS.category, "category_id", RESOURCE_SOURCE.body),
  ],
  registerPaymentService,
);
paymentServiceRoutes.get("/", [validToken, isActiveUser], getUserServices);
export default paymentServiceRoutes;
