import { Request, Response } from 'express';
import { sendResponseSurvey } from './response.service';
import { HttpError } from '../../utils/httpErrorHandler';



export const sendResponseSurveyController = async (req: Request, res: Response) => {
    try {
        const { userId, surveyId, selectedAlternatives }: { userId: string; surveyId: string; selectedAlternatives: string[] } = req.body;
        if (userId === undefined || surveyId === undefined || selectedAlternatives === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const result = await sendResponseSurvey(userId, surveyId, selectedAlternatives, false);
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: (error as Error).message });
    }
}

