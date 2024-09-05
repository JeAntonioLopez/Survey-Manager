import { Response } from 'express';
import { getSurveyResults, getUserSurveyResponses, sendResponseSurvey } from './response.service';
import { HttpError } from '../../utils/httpErrorHandler';
import { GetUserSurveyResultsDTO, SendResponseSurveyDTO } from '../../dto/response.module.dto';
import { AuthenticatedRequest } from '../../types/express';



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

export const getUserSurveyResultsController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { surveyId } = req.body;
        if (userId === undefined || surveyId === undefined) {
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

