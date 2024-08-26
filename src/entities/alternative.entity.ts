import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer';

@Entity()
export class Alternative extends BaseEntity {
    @PrimaryGeneratedColumn() // Serial 
    id: string;

    @Column({ nullable: false })
    value: string;

    @ManyToOne(() => Question, (question) => question.alternatives, { nullable: false, onDelete: "CASCADE"  })
    question: Question;

    @OneToMany(() => Answer, (answer) => answer.question, { cascade: true, onDelete: "CASCADE" })
    answers: Answer[];

}
