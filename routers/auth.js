import { Router } from "express";
import AuthController from "../controllers/auth.js";
const AuthRouter = Router();
const authController = new AuthController();
AuthRouter.post("/register", authController.register);

export default AuthRouter;
