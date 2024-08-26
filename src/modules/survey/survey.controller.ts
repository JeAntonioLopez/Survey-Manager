import { Request, Response } from 'express';
import { createAlternative, createQuestion, createSurvey, createUser, getSurveyById } from './survey.service';

export const getSurveyController = (req: Request, res: Response) => {
    const surveyId = req.params.id;
    const survey = getSurveyById(surveyId);
    if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
    }
    res.status(200).json(survey);
};

export const createUserController = async (req: Request, res: Response) => {
    const { email, password, repeatedPassword } = req.body;
    if (email === undefined || password === undefined || repeatedPassword === undefined) {
        return res.status(400).json({ message: 'Invalid arguments' });
    }
    if (password !== repeatedPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        const result = await createUser(email, password);
        return res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createSurveyController = async (req: Request, res: Response) => {
    const { email, description, name } = req.body;
    if (email === undefined || description === undefined || name === undefined) {
        return res.status(400).json({ message: 'Invalid arguments' });
    }
    try {
        const result = await createSurvey(email, description, name);
        return res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createQuestionController = async (req: Request, res: Response) => {
    const { surveyId, text } = req.body;
    if (surveyId === undefined || text === undefined) {
        return res.status(400).json({ message: 'Invalid arguments' });
    }
    try {
        const result = await createQuestion(surveyId, text);
        return res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createAlternativeController = async (req: Request, res: Response) => {
    const { questionId, value } = req.body;
    if (questionId === undefined || value === undefined) {
        return res.status(400).json({ message: 'Invalid arguments' });
    }
    try {
        const result = await createAlternative(questionId, value);
        return res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};