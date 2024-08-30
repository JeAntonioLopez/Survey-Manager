// 
// selected alternative id
// question id
// response id

// 
// triggers
// validate that the user only responds the question 1 time
// validate that the question id is for a question that belongs to the survey that is referenced in the question 
// validate that there is inly one answer per question
// for each answer add 1 to the response answered questions and if answered is n out of n questions on the survey, set completed to true on response
// 


import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { SurveyResponse } from './surveyResponse.entity';
import { Question } from './question.entity';
import { Alternative } from './alternative.entity';

@Entity()
export class Answer extends BaseEntity {
    @PrimaryGeneratedColumn() // Serial
    id: number;

    @ManyToOne(() => SurveyResponse, (response) => response.answers, { nullable: false, onDelete: "CASCADE" })
    surveyResponse: SurveyResponse;

    @ManyToOne(() => Question, (question) => question.answers, { nullable: false, onDelete: "CASCADE" })
    question: Question;

    @ManyToOne(() => Alternative, (alternative) => alternative.answers, { nullable: false, onDelete: "CASCADE" })
    alternative: Alternative;
}
