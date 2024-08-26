import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Survey } from './survey.entity';
import { User } from './user.entity';
import { Answer } from './answer';

@Entity()
export class SurveyResponse extends BaseEntity {
    @PrimaryGeneratedColumn() // Serial 
    id: string;

    @Column({ nullable: false})
    numberOfQuestions: number;

    @Column({ nullable: false , default: 0})
    numberOfAnswers: number = 0;

    @Column({ nullable: false , default: false })
    completed: boolean = false;;


    @ManyToOne(() => Survey, (survey) => survey.questions, { nullable: false, onDelete: "CASCADE" })
    survey: Survey;

    @ManyToOne(() => User, (user) => user.responses, { nullable: false, onDelete: "CASCADE" })
    user: User;

    // answer
    @OneToMany(() => Answer, (answer) => answer.surveyResponse, { cascade: true, onDelete: "CASCADE" })
    answers: Answer[];
}
