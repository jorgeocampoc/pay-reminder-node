import { Router } from "express";
import { auth, logout } from "../controllers/index.js";
import { validSchemaAuth, findSessionUser } from "../middlewares/index.js";

const authRoutes = Router();
authRoutes.post("/", [validSchemaAuth, findSessionUser], auth);
authRoutes.post("/logout", logout);

export default authRoutes;
