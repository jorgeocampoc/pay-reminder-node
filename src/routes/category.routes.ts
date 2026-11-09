import { Router } from "express";
import { getCategories, registerCategory } from "../controllers/index.js";
import {
  isActiveUser,
  validToken,
  validSchemaRegisterCategory,
} from "../middlewares/index.js";

const categoryRoutes = Router();
categoryRoutes.post(
  "/",
  [validToken, isActiveUser, validSchemaRegisterCategory],
  registerCategory,
);
categoryRoutes.get("/", [validToken, isActiveUser], getCategories);

export default categoryRoutes;
