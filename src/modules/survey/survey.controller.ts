import { Response } from 'express';
import { createAlternative, createQuestion, createSurvey, deleteAlternative, deleteQuestion, deleteSurvey, getAllSurveys, getUserSurveys, getUserUnasweredSurveys, updateSurvey } from './survey.service';
import { HttpError } from '../../utils/httpErrorHandler';
import { CreateAlternativeDTO, CreateQuestionDTO, CreateSurveyDTO, DeleteAlternativeDTO, DeleteQuetionDTO, DeleteSurveyDTO, UpdateSurveyDto } from '../../dto/survey.module.dto';
import { AuthenticatedRequest } from '../../types/express';


/**
 * @swagger
 * /api/survey:
 *   post:
 *     summary: Create a new survey
 *     description: Creates a new survey with a description and name.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       description: Survey details for creation.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Customer Feedback"
 *               description:
 *                 type: string
 *                 example: "Survey to gather customer feedback."
 *     responses:
 *       200:
 *         description: Successfully created the survey.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Survey created successfully"
 */
export const createSurveyController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { description, name } = req.body;
        if (userId === undefined || description === undefined || name === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const createSurveyDTO: CreateSurveyDTO = { userId, description, name };
        const result = await createSurvey(createSurveyDTO);
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
 * /api/survey:
 *   delete:
 *     summary: Delete a survey
 *     description: Deletes a survey based on its ID.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     requestBody:
 *       description: Survey ID to delete.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surveyId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the survey.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Survey deleted successfully"
 */
export const deleteSurveyController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { surveyId }: { surveyId: number } = req.body;
        if (userId === undefined || surveyId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const deleteSurveyDTO: DeleteSurveyDTO = { userId, surveyId };
        const result = await deleteSurvey(deleteSurveyDTO);
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
 * /api/survey:
 *   patch:
 *     summary: Update an existing survey
 *     description: Updates the details of an existing survey.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     requestBody:
 *       description: Survey details to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surveyId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Updated Survey Name"
 *               description:
 *                 type: string
 *                 example: "Updated description."
 *               released:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-01T00:00:00Z"
 *               closingDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-30T00:00:00Z"
 *     responses:
 *       200:
 *         description: Successfully updated the survey.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Survey updated successfully"
 */
export const updateSurveyController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { surveyId, name, description, released, closingDate } = req.body;
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
 * /api/survey/question:
 *   post:
 *     summary: Create a new question for a survey
 *     description: Adds a new question to a survey.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     requestBody:
 *       description: Question details for creation.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surveyId:
 *                 type: integer
 *                 example: 1
 *               text:
 *                 type: string
 *                 example: "What is your favorite color?"
 *     responses:
 *       200:
 *         description: Successfully created the question.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Question created successfully"
 */
export const createQuestionController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { surveyId, text } = req.body;
        if (surveyId === undefined || text === undefined || userId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const createQuestionDTO: CreateQuestionDTO = { userId, surveyId, text };
        const result = await createQuestion(createQuestionDTO);
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
 * /api/survey/question:
 *   delete:
 *     summary: Delete a question from a survey
 *     description: Deletes a question from a survey.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     requestBody:
 *       description: Question details for deletion.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surveyId:
 *                 type: integer
 *                 example: 1
 *               questionId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the question.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Question deleted successfully"
 */
export const deleteQuestionController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { surveyId, questionId } = req.body;
        if (userId === undefined || surveyId === undefined || questionId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const deleteQuestionDTO: DeleteQuetionDTO = { userId, surveyId, questionId };
        const result = await deleteQuestion(deleteQuestionDTO);
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
 * /api/survey/question/alternative:
 *   post:
 *     summary: Create a new alternative for a question
 *     description: Adds a new alternative to a question in a survey.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     requestBody:
 *       description: Alternative details for creation.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: integer
 *                 example: 1
 *               value:
 *                 type: string
 *                 example: "Blue"
 *     responses:
 *       200:
 *         description: Successfully created the alternative.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Alternative created successfully"
 */
export const createAlternativeController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { questionId, value } = req.body;
        if (questionId === undefined || value === undefined || userId) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const createAlternativeDTO: CreateAlternativeDTO = { userId, questionId, value };
        const result = await createAlternative(createAlternativeDTO);
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
 * /api/survey/question/alternative:
 *   delete:
 *     summary: Delete an alternative from a question
 *     description: Deletes an alternative from a question in a survey.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     requestBody:
 *       description: Alternative details for deletion.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surveyId:
 *                 type: integer
 *                 example: 1
 *               questionId:
 *                 type: integer
 *                 example: 1
 *               alternativeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the alternative.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Alternative deleted successfully"
 */
export const deleteAlternativeController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { surveyId, questionId, alternativeId } = req.body;
        if (userId === undefined || surveyId === undefined || questionId === undefined || alternativeId === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const deleteAlternativeDTO: DeleteAlternativeDTO = { userId, surveyId, questionId, alternativeId }
        const result = await deleteAlternative(deleteAlternativeDTO);
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
 * /api/survey:
 *   get:
 *     summary: Get user surveys
 *     description: Retrieves all surveys created by a specific user.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     responses:
 *       200:
 *         description: List of surveys created by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   surveyId:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Customer Feedback"
 *                   description:
 *                     type: string
 *                     example: "Survey to gather customer feedback."
 *                   released:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-01T00:00:00Z"
 *                   closingDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-30T00:00:00Z"
 */
export const getUserSurveysController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
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

/**
 * @swagger
 * /api/survey/all:
 *   get:
 *     summary: Get all surveys
 *     description: Retrieves all surveys available in the system.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     responses:
 *       200:
 *         description: List of all surveys in the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   surveyId:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Customer Feedback"
 *                   description:
 *                     type: string
 *                     example: "Survey to gather customer feedback."
 *                   released:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-01T00:00:00Z"
 *                   closingDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-30T00:00:00Z"
 */
export const getAllSurveysController = async (_req: AuthenticatedRequest, res: Response) => {
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

/**
 * @swagger
 * /api/survey/unanswered:
 *   get:
 *     summary: Get unanswered surveys for a user
 *     description: Retrieves surveys that a specific user has not yet answered.
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con token Bearer
 *     responses:
 *       200:
 *         description: List of unanswered surveys for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   surveyId:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Customer Feedback"
 *                   description:
 *                     type: string
 *                     example: "Survey to gather customer feedback."
 *                   released:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-01T00:00:00Z"
 *                   closingDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-30T00:00:00Z"
 */
export const getUserUnasweredSurveysController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
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



