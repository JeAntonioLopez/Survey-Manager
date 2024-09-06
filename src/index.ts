require('dotenv').config();
import express from 'express';
import { surveyRoutes } from './modules/survey/survey.routes';
import morgan from 'morgan';
import cors from 'cors';
import "reflect-metadata"
import { AppDataSource } from './utils/typeormConfig';
import { responseRoutes } from './modules/response/response.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { authMiddleware } from './middlewares/authMiddleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';




const app = express();


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation with Swagger'
        },
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'API Server',
        },
    ],
    apis: [
        './src/modules/**/*controller.ts'
    ],
};





app.use(cors());
app.use(morgan('dev'));

app.use(express.json());

const PORT = 3000;

app.use('/api/survey', authMiddleware);
app.use('/api/response', authMiddleware);

app.use('/api/survey', surveyRoutes);
app.use('/api/response', responseRoutes);
app.use('/api/auth', authRoutes);

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

try {
    AppDataSource.initialize();
    console.log('Database connection established successfully');
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})