import { Request, Response } from 'express';
import { createAlternative, createQuestion, createSurvey, getAllSurveys, getUserSurveys, getUserUnasweredSurveys, updateSurvey } from './survey.service';
import { HttpError } from '../../utils/httpErrorHandler';
import { UpdateSurveyDto } from '../../dto/survey.module.dto';


export const createSurveyController = async (req: Request, res: Response) => {
    try {
        const { email, description, name } = req.body;
        if (email === undefined || description === undefined || name === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const result = await createSurvey(email, name, description);
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateSurveyController = async (req: Request, res: Response) => {
    try {
        const { userId, surveyId, name, description, released, closingDate } = req.body;
        if (userId === undefined || surveyId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        if (name === undefined && description === undefined && released === undefined && closingDate === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const updateSurveyDTO: UpdateSurveyDto = {
            userId: userId,
            surveyId: surveyId,
            name: name,
            description: description,
            released: released,
            closingDate: closingDate
        };
        const result = await updateSurvey(updateSurveyDTO);
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createQuestionController = async (req: Request, res: Response) => {
    try {
        const { surveyId, text } = req.body;
        if (surveyId === undefined || text === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const result = await createQuestion(surveyId, text);
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createAlternativeController = async (req: Request, res: Response) => {
    try {
        const { questionId, value } = req.body;
        if (questionId === undefined || value === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const result = await createAlternative(questionId, value);
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getUserSurveysController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        if (userId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const result = await getUserSurveys(userId);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getAllSurveysController = async (_req: Request, res: Response) => {
    try {
        const result = await getAllSurveys();
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};


export const getUserUnasweredSurveysController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        if (userId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const result = await getUserUnasweredSurveys(userId);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};



