import { Router } from 'express';
import {  createUserController, createSurveyController, createQuestionController, createAlternativeController } from './survey.controller';

export const surveyRoutes: Router = Router();

//surveyRoutes.get('/:id', );
surveyRoutes.post('/user', createUserController);
surveyRoutes.post('/', createSurveyController);
surveyRoutes.post('/question', createQuestionController);
surveyRoutes.post('/question/alternative', createAlternativeController);