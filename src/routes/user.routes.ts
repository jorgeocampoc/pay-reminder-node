import { Router } from "express";
import { getUser, registerUser, uploadImage } from "../controllers/index.js";
import {
  isActiveUser,
  validSchemaRegisterUser,
  validToken,
} from "../middlewares/index.js";
import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
});
const userRoutes = Router();
userRoutes.post("/", [validSchemaRegisterUser], registerUser);
userRoutes.get("/", [validToken, isActiveUser], getUser);
userRoutes.put("/upload-image", [upload.single("image")], uploadImage);

export default userRoutes;
