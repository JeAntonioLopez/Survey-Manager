import { Router } from "express";
import { changePasswordController, loginController, registerUserController } from "./auth.controller";

export const authRoutes: Router = Router();

authRoutes.post('/register', registerUserController);
authRoutes.post('/login', loginController);
authRoutes.put('/changuePassword', changePasswordController);
