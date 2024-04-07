import { Router } from "express";
import AuthController from "../controllers/auth.js";
const AuthRouter = Router();
const authController = new AuthController();
AuthRouter.post("/register", authController.register);
AuthRouter.post("/login", authController.login);

export default AuthRouter;
