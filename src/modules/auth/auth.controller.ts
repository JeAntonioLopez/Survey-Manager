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

