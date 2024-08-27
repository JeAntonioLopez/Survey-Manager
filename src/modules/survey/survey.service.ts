import { Alternative } from "../../entities/alternative.entity";
import { Question } from "../../entities/question.entity";
import { Survey } from "../../entities/survey.entity";
import { User } from "../../entities/user.entity";
import { HttpError } from "../../utils/httpErrorHandler";


export const createUser = async (email: string, password: string) => {
    const user = new User();
    user.email = email;
    user.password = password;
    await user.save();
    return ({ user: user });
};

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

