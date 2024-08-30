import { Request, Response } from 'express';
import { createAlternative, createQuestion, createSurvey, deleteAlternative, deleteQuestion, deleteSurvey, getAllSurveys, getUserSurveys, getUserUnasweredSurveys, updateSurvey } from './survey.service';
import { HttpError } from '../../utils/httpErrorHandler';
import { CreateAlternativeDTO, CreateQuestionDTO, CreateSurveyDTO, DeleteAlternativeDTO, DeleteQuetionDTO, DeleteSurveyDTO, UpdateSurveyDto } from '../../dto/survey.module.dto';


export const createSurveyController = async (req: Request, res: Response) => {
    try {
        const { userId, description, name } = req.body;
        if (userId === undefined || description === undefined || name === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const createSurveyDTO: CreateSurveyDTO = {userId, description, name};
        const result = await createSurvey(createSurveyDTO);
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteSurveyController = async (req: Request, res: Response) => {
    try {
        const { userId, surveyId }: { userId: number, surveyId: number } = req.body;
        if (userId === undefined || surveyId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const deleteSurveyDTO: DeleteSurveyDTO = {userId, surveyId};
        const result = await deleteSurvey(deleteSurveyDTO);
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
        const createQuestionDTO : CreateQuestionDTO = { surveyId, text };
        const result = await createQuestion(createQuestionDTO);
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteQuestionController = async (req: Request, res: Response) => {
    try {
        const { userId, surveyId, questionId } = req.body;
        if (userId === undefined || surveyId === undefined || questionId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const deleteQuestionDTO: DeleteQuetionDTO = {userId,surveyId, questionId};
        const result = await deleteQuestion(deleteQuestionDTO);
        return res.status(200).json(result);
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
        const createAlternativeDTO: CreateAlternativeDTO = { questionId, value };
        const result = await createAlternative(createAlternativeDTO);
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteAlternativeController = async (req: Request, res: Response) => {
    try {
        const { userId, surveyId, questionId, alternativeId } = req.body;
        if (userId === undefined || surveyId === undefined || questionId === undefined || alternativeId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const deleteAlternativeDTO: DeleteAlternativeDTO = {userId,surveyId,questionId,alternativeId}
        const result = await deleteAlternative(deleteAlternativeDTO);
        return res.status(200).json(result);
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



