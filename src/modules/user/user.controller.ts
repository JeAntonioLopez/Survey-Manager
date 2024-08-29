import { Request, Response } from 'express';
import { HttpError } from '../../utils/httpErrorHandler';
import { createUser } from './user.service';


export const createUserController = async (req: Request, res: Response) => {
    try {
        const { email, password, repeatedPassword } = req.body;
        if (email === undefined || password === undefined || repeatedPassword === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        if (password !== repeatedPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const result = await createUser(email, password);
        return res.status(200).json({ result });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};