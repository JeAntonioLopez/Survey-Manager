import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
import { Survey } from './entities/survey.entity'
import { Question } from './entities/question.entity'
import { Alternative } from './entities/alternative.entity'
import { SurveyResponse } from './entities/surveyResponse.entity'
import { Answer } from './entities/answer'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "survey_manager_db",
    synchronize: true,
    logging: false,
    entities: [User, Survey, Question, Alternative, SurveyResponse, Answer]
})