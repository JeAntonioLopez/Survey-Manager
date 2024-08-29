import { Router } from 'express';
import { getUserSurveyResponsesController, sendResponseSurveyController } from './response.controller';


export const responseRoutes: Router = Router();


responseRoutes.post('/', sendResponseSurveyController);
responseRoutes.get('/', getUserSurveyResponsesController );