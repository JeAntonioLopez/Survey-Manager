require('dotenv').config();  
import express from 'express';
import {surveyRoutes} from './modules/survey/survey.routes';
import morgan from 'morgan';
import cors from 'cors';
import "reflect-metadata"
import { AppDataSource } from './utils/typeormConfig';
import { responseRoutes } from './modules/response/response.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { authMiddleware } from './middlewares/authMiddleware';


const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());

const PORT = 3000;

app.use('/api/survey', authMiddleware);
app.use('/api/response', authMiddleware);

app.use('/api/survey', surveyRoutes);
app.use('/api/response', responseRoutes);
app.use('/api/auth', authRoutes);

try {
    AppDataSource.initialize();
    console.log('Database connection established successfully');
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})