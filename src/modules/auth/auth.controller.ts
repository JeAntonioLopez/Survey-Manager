import { Request, Response } from 'express';
import { HttpError } from '../../utils/httpErrorHandler';
import { registerUser, login, changuePassword } from './auth.service';
import { RegisterUserDTO, LoginDTO, ChangePasswordDTO } from '../../dto/auth.module.dto';


export const registerUserController = async (req: Request, res: Response) => {
    try {
        const { email, password, repeatedPassword } = req.body;
        if (email === undefined || password === undefined || repeatedPassword === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        if (password !== repeatedPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const RegisterUserDTO: RegisterUserDTO = { email: email, password: password }
        const result = await registerUser(RegisterUserDTO);
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
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token if the credentials are correct.
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully authenticated user and returned JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
 *       400:
 *         description: Invalid arguments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Invalid arguments'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Internal server error'
 */

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (email === undefined || password === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const loginDTO: LoginDTO = { email: email, password: password }
        const result = await login(loginDTO);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};


export const changePasswordController = async (req: Request, res: Response) => {
    try {
        const { email, newPassword } = req.body;
        if (email === undefined || newPassword === undefined) {
            return res.status(400).json({ message: 'Invalid arguments' });
        }
        const changuePasswordDTO: ChangePasswordDTO = { email: email, newPassword: newPassword }
        const result = await changuePassword(changuePasswordDTO);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: (error as Error).message });
    }
};

