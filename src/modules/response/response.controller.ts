import { Request, Response } from 'express';
import { getSurveyResults, getUserSurveyResponses, sendResponseSurvey } from './response.service';
import { HttpError } from '../../utils/httpErrorHandler';
import { GetUserSurveyResultsDTO, SendResponseSurveyDTO } from '../../dto/response.module.dto';



export const sendResponseSurveyController = async (req: Request, res: Response) => {
    try {
        const { userId, surveyId, selectedAlternativesIds }: { userId: number; surveyId: number; selectedAlternativesIds: string[] } = req.body;
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
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: (error as Error).message });
    }
}

export const getUserSurveyResponsesController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
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

export const getUserSurveyResultsController = async (req: Request, res: Response) => {
    try {
        const { userId, surveyId } = req.body;
        if (userId === undefined || surveyId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const getUserSurveyResultsDTO: GetUserSurveyResultsDTO = {userId, surveyId};
        const result = await getSurveyResults(getUserSurveyResultsDTO);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

