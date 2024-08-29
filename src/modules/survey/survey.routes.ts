import { Router } from 'express';
import {  createSurveyController, createQuestionController, createAlternativeController, getUserSurveysController, getAllSurveysController, getUserUnasweredSurveysController} from './survey.controller';


export const surveyRoutes: Router = Router();

surveyRoutes.get('/', getUserSurveysController );
surveyRoutes.get('/all', getAllSurveysController );
surveyRoutes.get('/unanswered', getUserUnasweredSurveysController );
surveyRoutes.post('/', createSurveyController);
surveyRoutes.post('/question', createQuestionController);
surveyRoutes.post('/question/alternative', createAlternativeController);