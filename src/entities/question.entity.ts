import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Survey } from './survey.entity';
import { Alternative } from './alternative.entity';
import { Answer } from './answer';

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn() // Serial 
    id: string;

    @Column({ nullable: false })
    text: string;

    @ManyToOne(() => Survey, (survey) => survey.questions, { nullable: false, onDelete: "CASCADE" })
    survey: Survey;

    @OneToMany(() => Alternative, (alternative) => alternative.question, { cascade: true, onDelete: "CASCADE" })
    alternatives: Alternative[];

    @OneToMany(() => Answer, (answer) => answer.question, { cascade: true, onDelete: "CASCADE" })
    answers: Answer[];
}
