import { Response } from 'express';
import { getSurveyResults, getUserSurveyResponses, sendResponseSurvey } from './response.service';
import { HttpError } from '../../utils/httpErrorHandler';
import { GetUserSurveyResultsDTO, SendResponseSurveyDTO } from '../../dto/response.module.dto';
import { AuthenticatedRequest } from '../../types/express';


/**
 * @swagger
 * /api/response:
 *   post:
 *     summary: Submit a response to a survey
 *     description: Submits a response for a survey by a user, including selected alternatives.
 *     tags: [Survey Responses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The survey ID, user ID, and selected alternatives IDs for submitting the response.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surveyId:
 *                 type: integer
 *                 example: 2
 *               selectedAlternativesIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ["16", "17", "18"]
 *             required:
 *               - surveyId
 *               - selectedAlternativesIds
 *     responses:
 *       200:
 *         description: Successfully submitted the survey response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Response submitted successfully"
 */
export const sendResponseSurveyController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { surveyId, selectedAlternativesIds }: { userId: number; surveyId: number; selectedAlternativesIds: string[] } = req.body;
        if (userId === undefined || surveyId === undefined || selectedAlternativesIds === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const sendResponseSurveyDTO: SendResponseSurveyDTO = {
            userId,
            surveyId,
            selectedAlternativesIds,
            allowIncompleteResponses: false,
        };
        const result = await sendResponseSurvey(sendResponseSurveyDTO);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: (error as Error).message });
    }
}


/**
 * @swagger
 * /api/response:
 *   get:
 *     summary: Get user's survey responses
 *     description: Retrieves the list of surveys the user has responded to.
 *     tags: [Survey Responses]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: List of user survey responses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numberOfAnswers:
 *                     type: integer
 *                     example: 3
 *                   completed:
 *                     type: boolean
 *                     example: true
 *                   id:
 *                     type: integer
 *                     example: 6
 *                   numberOfQuestions:
 *                     type: integer
 *                     example: 3
 *                   answers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 16
 *                         alternative:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             value:
 *                               type: string
 *                               example: "tangananica"
 *                         question:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             text:
 *                               type: string
 *                               example: "¿Tangananica o tanganana?"
 *                   survey:
 *                     type: object
 *                     properties:
 *                       released:
 *                         type: boolean
 *                         example: true
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: "Nombre de la Encuesta"
 *                       description:
 *                         type: string
 *                         example: "Descripción de la encuesta"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-24T01:34:06.945Z"
 *                       closingDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-31T04:00:00.000Z"
 */

export const getUserSurveyResponsesController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        if (userId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const result = await getUserSurveyResponses(userId);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

/**
 * @swagger
 * /api/response/results:
 *   get:
 *     summary: Get user survey results
 *     description: Retrieves the results of a survey, including the distribution of answers and percentages for each alternative.
 *     tags: [Survey Responses]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     parameters:
 *       - name: surveyId
 *         in: query
 *         description: The ID of the survey for which to retrieve results.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: List of survey results with question and alternatives.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   questionText:
 *                     type: string
 *                     example: "¿Tangananica o tanganana?"
 *                   alternatives:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         alternativeText:
 *                           type: string
 *                           example: "tangananica"
 *                         numberOfAnswers:
 *                           type: integer
 *                           example: 2
 *                         percentage:
 *                           type: integer
 *                           example: 100
 *                   totalNumberOfAnswers:
 *                     type: integer
 *                     example: 2
 *               example: [
 *                 {
 *                   "questionText": "¿Tangananica o tanganana?",
 *                   "alternatives": [
 *                     {
 *                       "alternativeText": "tangananica",
 *                       "numberOfAnswers": 1,
 *                       "percentage": 50
 *                     },
 *                     {
 *                       "alternativeText": "tanganana",
 *                       "numberOfAnswers": 1,
 *                       "percentage": 50
 *                     }
 *                   ],
 *                   "totalNumberOfAnswers": 2
 *                 }
 *               ]
 */
export const getUserSurveyResultsController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const surveyId = parseInt(req.query.surveyId as string, 10);
        if (userId === undefined || isNaN(surveyId)) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const getUserSurveyResultsDTO: GetUserSurveyResultsDTO = { userId, surveyId };
        const result = await getSurveyResults(getUserSurveyResultsDTO);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};



