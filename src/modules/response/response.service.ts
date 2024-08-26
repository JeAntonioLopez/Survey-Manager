import { Answer } from "../../entities/answer";
import { Survey } from "../../entities/survey.entity";
import { SurveyResponse } from "../../entities/surveyResponse.entity";
import { User } from "../../entities/user.entity";



export const sendResponseSurvey = async (userId: string, surveyId: string, selectedAlternativesIds: string[], allowIncompleteResponses: boolean) => {
    // search the user
    const user = await User.findOne({ where: { id: userId }  });
    if (!user) {
        throw new Error("User not found");
    }

    /// search the survey
    const survey = await Survey.findOne({ where: { id: surveyId }, relations: ['questions', 'questions.alternatives'] });

    if (!survey) {
        throw new Error("Survey not found");
    }
    console.log("\nQuestions:");
    console.log(survey.questions);
    console.log(selectedAlternativesIds);
    /// check that the amount of questions for the survey matches the lenght of the selectedAlternativesIds array
    if (survey.questions.length != selectedAlternativesIds.length) {
        throw new Error("Invalid number of questions for this survey");
    }

    /// create empty array of answers
    const answers: Answer[] = [];

    /// create a survey response object referencing the survey and the user
    const surveyResponse = new SurveyResponse();
    surveyResponse.user = user;
    surveyResponse.survey = survey;
    surveyResponse.numberOfQuestions = survey.questions.length;
    surveyResponse.numberOfAnswers = 0;

    /// for each question in the survey
    for (let i = 0; i < survey.questions.length; i++) {
        /// check if the alternative its valid for the survey->question
        const question = survey.questions[i];
        const selectedAlternativeId = selectedAlternativesIds[i];
        const selectedAlternative = question.alternatives.find(({ id }) => String(id) === selectedAlternativeId);
        console.log("\nQuestion:");
        console.log(question.text);
        console.log("Alternatives:");
        console.log(question.alternatives);
        console.log("Selected alternative:");
        console.log(selectedAlternative);
        if (!selectedAlternative) {
            throw new Error("Invalid alternative selected for this question");
        }
        else if (!allowIncompleteResponses) {
            // create an answer object on the array referencing the survey response, question and alternative
            const answer = new Answer();
            answer.surveyResponse = surveyResponse;
            answer.question = question;
            answer.alternative = selectedAlternative;

            surveyResponse.numberOfAnswers = surveyResponse.numberOfAnswers + 1;
        }


    }
    console.log(surveyResponse)
    console.log(answers)

    return answers;

    /// if everything went well save the survey response object, and then save every answer on the array


};