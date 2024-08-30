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
