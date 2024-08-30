import { Router } from 'express';
import { getUserSurveyResponsesController, getUserSurveyResultsController, sendResponseSurveyController } from './response.controller';


export const responseRoutes: Router = Router();


responseRoutes.post('/', sendResponseSurveyController);
responseRoutes.get('/', getUserSurveyResponsesController );
responseRoutes.get('/results', getUserSurveyResultsController );