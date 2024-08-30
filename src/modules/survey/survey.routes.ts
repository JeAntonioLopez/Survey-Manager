import { Router } from 'express';
import { createSurveyController, createQuestionController, createAlternativeController, getUserSurveysController, getAllSurveysController, getUserUnasweredSurveysController, updateSurveyController, deleteSurveyController, deleteQuestionController, deleteAlternativeController } from './survey.controller';


export const surveyRoutes: Router = Router();

surveyRoutes.get('/', getUserSurveysController);
surveyRoutes.patch('/', updateSurveyController);
surveyRoutes.get('/all', getAllSurveysController);
surveyRoutes.get('/unanswered', getUserUnasweredSurveysController);
surveyRoutes.post('/', createSurveyController);
surveyRoutes.delete('/', deleteSurveyController);
surveyRoutes.post('/question', createQuestionController);
surveyRoutes.delete('/question', deleteQuestionController);
surveyRoutes.post('/question/alternative', createAlternativeController);
surveyRoutes.delete('/question/alternative', deleteAlternativeController);