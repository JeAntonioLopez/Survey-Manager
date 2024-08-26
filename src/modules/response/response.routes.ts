import { Router } from 'express';
import { sendResponseSurveyController } from './response.controller';

export const responseRoutes: Router = Router();


//*
//*surveyRoutes.get('/:id', getSurveyController);
responseRoutes.post('/', sendResponseSurveyController);