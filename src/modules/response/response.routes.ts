import { Router } from 'express';
import { sendResponseSurveyController } from './response.controller';

export const responseRoutes: Router = Router();


responseRoutes.post('/', sendResponseSurveyController);