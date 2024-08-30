import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class SendResponseSurveyDTO {
    @IsNumber()
    userId: number;

    @IsNumber()
    surveyId: number;

    @IsArray()
    @IsString({ each: true })
    selectedAlternativesIds: string[];

    @IsBoolean()
    allowIncompleteResponses: boolean

}
 
export class GetUserSurveyResultsDTO {
    @IsNumber()
    userId: number;

    @IsNumber()
    surveyId: number;
}