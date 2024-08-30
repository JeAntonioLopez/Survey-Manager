import { Answer } from "../../entities/answer";
import { Survey } from "../../entities/survey.entity";
import { SurveyResponse } from "../../entities/surveyResponse.entity";
import { User } from "../../entities/user.entity";
import { HttpError } from "../../utils/httpErrorHandler";



export const sendResponseSurvey = async (userId: number, surveyId: number, selectedAlternativesIds: string[], allowIncompleteResponses: boolean) => {
    // search the user
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        throw new HttpError("User not found", 404);
    }

    /// search the survey
    const survey = await Survey.findOne({ where: { id: surveyId }, relations: ['questions', 'questions.alternatives'] });

    if (!survey) {
        throw new HttpError("Survey not found", 404);
    }

    // check if the survey has been responded before by the user
    const existingSurveyResponse = await SurveyResponse.findOne({ where: { user: { id: userId }, survey: { id: surveyId } } });
    if (existingSurveyResponse) {
        throw new HttpError("User has already responded to this survey", 400);
    }

    // check if the survey is released
    if (!survey.released) {
        throw new HttpError("The survey hasnt been released", 400);
    }

    // check if the survey its been answered before closing date
    if (new Date(survey.closingDate) < new Date()) {
        throw new HttpError("The survey is closed", 400);
    }

    console.log("\nQuestions:");
    console.log(survey.questions);
    console.log(selectedAlternativesIds);

    /// check that the amount of questions for the survey matches the lenght of the selectedAlternativesIds array
    if (survey.questions.length != selectedAlternativesIds.length) {
        throw new HttpError("Invalid number of questions for this survey", 400);
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
            if (!allowIncompleteResponses) {
                throw new HttpError("Invalid alternative selected for this question", 400);
            }
            // If incomplete responses are allowed, just continue to the next iteration
            continue;
        }
        // create an answer object on the array referencing the survey response, question and alternative
        const answer = new Answer();
        answer.surveyResponse = surveyResponse;
        answer.question = question;
        answer.alternative = selectedAlternative;

        surveyResponse.numberOfAnswers = surveyResponse.numberOfAnswers + 1;
        answers.push(answer);

    }

    surveyResponse.completed = surveyResponse.numberOfAnswers === surveyResponse.numberOfQuestions ? true : false;
    await surveyResponse.save();
    for (const a of answers) {
        await a.save();
    }

    /// if everything went well save the survey response object, and then save every answer on the array
    return surveyResponse;

};


export const getUserSurveyResponses = async (userId: number) => {
    // search user by id
    const user = await User.findOne({ where: { id: userId }, relations: ['responses', 'responses.answers', 'responses.survey', 'responses.answers.alternative', 'responses.answers.question'] });
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    return (user);
};

export const getSurveyResults = async (userId: number, surveyId: number) => {
    // search user
    const user = await User.findOne({ where: { id: userId }, relations: ['surveys', 'surveys.questions','surveys.questions.alternatives'] });
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    const survey = user.surveys.find(({ id }) => id === surveyId);
    if (!survey) {
        throw new HttpError('Survey not found', 404);
    }

    const surveyResults: {
        questionText: string;
        alternatives: {
            alternativeText: string;
            numberOfAnswers: number;
            percentage: number;
        }[];
        totalNumberOfAnswers: number;
    }[] = [];

    // for each question
    for (const question of survey.questions) {
        let totalNumberOfAnswers = 0;

        const alternativesResults = [];

        // count results for each alternative
        for (const alternative of question.alternatives) {
            const numberOfAnswers = await Answer.count({
                where: { alternative: { id: alternative.id } }
            });

            totalNumberOfAnswers += numberOfAnswers;

            alternativesResults.push({
                alternativeText: alternative.value,
                numberOfAnswers,
                percentage: 0 
            });
        }

        // calculate percentage for each alternative
        alternativesResults.forEach(alternativeResult => {
            if (totalNumberOfAnswers > 0) {
                alternativeResult.percentage = (alternativeResult.numberOfAnswers / totalNumberOfAnswers) * 100;
            } else {
                alternativeResult.percentage = 0;
            }
        });

        // save question results
        surveyResults.push({
            questionText: question.text,
            alternatives: alternativesResults,
            totalNumberOfAnswers
        });
    }


    return surveyResults;
};