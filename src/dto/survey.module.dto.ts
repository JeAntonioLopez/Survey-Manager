import { IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class UpdateSurveyDto {
    @IsString()
    userId: string;

    @IsString()
    surveyId: string;

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
    closingDate?: string; /// string to use the split function
}
