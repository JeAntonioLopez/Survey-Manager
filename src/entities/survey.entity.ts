import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';

@Entity()
export class Survey extends BaseEntity {
    @PrimaryGeneratedColumn() // Serial 
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column()
    description: string;

    @Column({ default: false })
    released: boolean = false;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.surveys, { nullable: false, onDelete: "CASCADE" })
    user: User;

    @OneToMany(() => Question, (question) => question.survey, { cascade: true, onDelete: "CASCADE" })
    questions: Question[];
}
