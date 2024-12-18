import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer';

@Entity()
@Unique(["question", "value"])
export class Alternative extends BaseEntity {
    @PrimaryGeneratedColumn() // Serial 
    id: number;

    @Column({ nullable: false })
    value: string;

    @ManyToOne(() => Question, (question) => question.alternatives, { nullable: false, onDelete: "CASCADE"  })
    question: Question;

    @OneToMany(() => Answer, (answer) => answer.question, { cascade: true, onDelete: "CASCADE" })
    answers: Answer[];

}
