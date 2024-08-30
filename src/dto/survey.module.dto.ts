import { IsOptional, IsString, IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class UpdateSurveyDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    surveyId: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    released?: boolean;

    @IsOptional()
    @IsDateString()
    closingDate?: string; /// string to use the .split method
}

export class CreateSurveyDTO {
    @IsNumber()
    userId: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}

export class DeleteSurveyDTO {
    @IsNumber()
    userId: number; 

    @IsNumber()
    surveyId: number;
}

export class DeleteQuetionDTO {
    @IsNumber()
    userId: number;

    @IsNumber()
    surveyId: number;

    @IsNumber()
    questionId: number;
}

export class DeleteAlternativeDTO{
    @IsNumber()
    userId: number;

    @IsNumber()
    surveyId: number;

    @IsNumber()
    questionId: number;

    @IsNumber()
    alternativeId: number;
}

export class CreateQuestionDTO{
    @IsNumber()
    surveyId: number;

    @IsString()
    text: string;
}

export class CreateAlternativeDTO{
    @IsNumber()
    questionId: number;

    @IsString()
    value: string;
}
