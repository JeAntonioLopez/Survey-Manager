import { Router } from "express";
import { createUserController } from "./user.controller";


export const userRoutes: Router = Router();



userRoutes.post('/', createUserController);
