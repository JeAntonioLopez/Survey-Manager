import { Alternative } from "../../entities/alternative.entity";
import { Question } from "../../entities/question.entity";
import { Survey } from "../../entities/survey.entity";
import { SurveyResponse } from "../../entities/surveyResponse.entity";
import { User } from "../../entities/user.entity";
import { HttpError } from "../../utils/httpErrorHandler";



export const createSurvey = async (email: string, description: string, name: string) => {
    // search user by email
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    // create survey
    const survey = new Survey();
    survey.name = name;
    survey.description = description;
    survey.user = user;
    await survey.save();
    return ({ survey: survey });
};


export const createQuestion = async (surveyId: string, text: string) => {
    // search survey by id
    const survey = await Survey.findOne({ where: { id: surveyId } });
    if (!survey) {
        throw new HttpError('Survey not found', 404);
    }

    // creater question
    const question = new Question();
    question.text = text;
    question.survey = survey;
    await question.save();
    return ({ question: question });
};

export const createAlternative = async (questionId: string, value: string) => {
    // search question by id
    const question = await Question.findOne({ where: { id: questionId } });
    if (!question) {
        throw new HttpError('Question not found', 404);
    }

    // creater alternative
    const alternative = new Alternative();
    alternative.value = value;
    alternative.question = question;
    await alternative.save();
    return ({ alternative: alternative });
};

export const getUserSurveys = async (userId: string) => {
    // search user by id
    const user = await User.findOne({ where: { id: userId }, relations: ['surveys', 'surveys.questions', 'surveys.questions.alternatives'] });
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    return ({ surveys: user.surveys });
};

export const getAllSurveys = async () => {
    const surveys = await Survey.find({ relations: ['questions', 'questions.alternatives'] });
    return { surveys };
};

export const getUserUnasweredSurveys = async (userId: string) => {
    // Search for the user by id
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    // Get all surveys
    const surveys = await Survey.find({ relations: ['questions', 'questions.alternatives'] });

    // Get survey responses by the user
    const surveyResponses = await SurveyResponse.find({ where: { user: { id: userId } }, relations: ['survey'] });

    // Extract survey IDs that have been responded to
    const respondedSurveyIds = new Set(surveyResponses.map(response => response.survey.id));

    // Filter surveys that have not been responded to by the user
    const unansweredSurveys = surveys.filter(survey => !respondedSurveyIds.has(survey.id));

    return { unansweredSurveys };
};