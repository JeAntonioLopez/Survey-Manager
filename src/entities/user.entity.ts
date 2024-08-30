import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Survey } from './survey.entity';
import { SurveyResponse } from './surveyResponse.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn() // Serial 
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn() // Automatic date 
    createdAt: Date;

    @OneToMany(() => Survey, (survey) => survey.user, { cascade: true, onDelete: "CASCADE" })
    surveys: Survey[];
    
    @OneToMany(() => SurveyResponse, (response) => response.user, { cascade: true, onDelete: "CASCADE" })
    responses: SurveyResponse[];
}
