import { Alternative } from "../../entities/alternative.entity";
import { Question } from "../../entities/question.entity";
import { Survey } from "../../entities/survey.entity";
import { User } from "../../entities/user.entity";

const surveyList = [
    {
        surveyId: "1",
        description: "Survey 1 description"
    },
    {
        surveyId: "2",
        description: "Survey 2 description"
    },
    {
        surveyId: "3",
        description: "Survey 3 description"
    },
];

export const getSurveyById = (id: string) => {
    const survey = surveyList.find(({ surveyId }) => surveyId === id);
    if (survey) {
        return survey;
    }
    return null;
};

export const createUser = async (email: string, password: string) => {
    try {
        const user = new User();
        user.email = email;
        user.password = password;
        await user.save();
        return ({ user: user });
    } catch (error) {
        const err: Error = error as Error;
        throw Error(err.message);
    }
};

export const createSurvey = async (email: string, description: string, name: string) => {
    try {
        // search user by email
        const user = await User.findOne({ where: { email:email } });
        if (!user) {
            throw Error('User not found');
        }
        
        // create survey
        const survey = new Survey();
        survey.name = name;
        survey.description = description;
        survey.user = user;
        await survey.save();
        return ({ survey: survey });
    } catch (error) {
        const err: Error = error as Error;
        throw Error(err.message);
    }
};


export const createQuestion = async (surveyId: string, text: string) => {
    try {
        // search survey by id
        const survey = await Survey.findOne({ where: { id:surveyId } });
        if (!survey) {
            throw Error('Survey not found');
        }
        
        // creater question
        const question = new Question();
        question.text = text;
        question.survey = survey;
        await question.save();
        return ({ question: question });
    } catch (error) {
        const err: Error = error as Error;
        throw Error(err.message);
    }
};

export const createAlternative = async (questionId: string, value: string) => {
    try {
        // search question by id
        const question = await Question.findOne({ where: { id:questionId } });
        if (!question) {
            throw Error('Question not found');
        }
        
        // creater alternative
        const alternative = new Alternative();
        alternative.value = value;
        alternative.question = question;
        await alternative.save();
        return ({ alternative: alternative });
    } catch (error) {
        const err: Error = error as Error;
        throw Error(err.message);
    }
};

