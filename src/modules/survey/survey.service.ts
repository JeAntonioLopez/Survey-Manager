import { CreateSurveyDTO, UpdateSurveyDto, DeleteSurveyDTO, DeleteQuetionDTO, DeleteAlternativeDTO, CreateQuestionDTO, CreateAlternativeDTO } from '../../dto/survey.module.dto';
import { Alternative } from "../../entities/alternative.entity";
import { Question } from '../../entities/question.entity';
import { Survey } from "../../entities/survey.entity";
import { SurveyResponse } from "../../entities/surveyResponse.entity";
import { User } from "../../entities/user.entity";
import { HttpError } from "../../utils/httpErrorHandler";



export const createSurvey = async (createSurveyDTO: CreateSurveyDTO) => {
    // search user by email
    const { userId, description, name } = createSurveyDTO;
    const user = await User.findOne({ where: { id: userId } });
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

export const deleteSurvey = async (deleteSurveyDTO: DeleteSurveyDTO) => {
    const { userId, surveyId } = deleteSurveyDTO;
    const user = await User.findOne({ where: { id: userId }, relations: ['surveys'] });
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    const survey = user.surveys.find(s => s.id === surveyId);
    if (!survey) {
        throw new HttpError('Survey not found', 404);
    }

    await Survey.remove(survey);

    const updatedUser = await User.findOne({ where: { id: userId }, relations: ['surveys'] });
    if (!updatedUser) {
        throw new HttpError('User not found, survey was deleted', 404);
    }
    return (updatedUser.surveys);
};

export const deleteQuestion = async (deleteQuetionDTO: DeleteQuetionDTO) => {
    const { userId, surveyId, questionId } = deleteQuetionDTO;
    /*
    SELECT q.*
    FROM question q
    JOIN survey s ON q.surveyId = s.id
    JOIN "user" u ON s.userId = u.id
    WHERE q.id = ? AND s.id = ? AND u.id = ?;
    */
    const question = await Question.findOne({
        where: {
            id: questionId,
            survey: {
                id: surveyId,
                user: {
                    id: userId
                }
            }
        },
        relations: []
    });

    if (!question) {
        throw new HttpError('Question not found or does not belong to the specified user and survey', 404);
    }

    await Question.remove(question);

    const updatedSurvey = await Survey.findOne({
        where: { id: surveyId, user: { id: userId } },
        relations: ['questions']
    });

    if (!updatedSurvey) {
        throw new HttpError('Survey not found after deletion', 404);
    }

    return updatedSurvey;
};

export const deleteAlternative = async (deleteAlternativeDTO: DeleteAlternativeDTO) => {
    const { userId, surveyId, questionId, alternativeId } = deleteAlternativeDTO
    /*
    SELECT a.*
    FROM alternative a
    JOIN question q ON a.questionId = q.id
    JOIN survey s ON q.surveyId = s.id
    JOIN "user" u ON s.userId = u.id
    WHERE q.id = ? AND s.id = ? AND u.id = ?;
    */
    const alternative = await Alternative.findOne({
        where: {
            id: alternativeId,
            question: {
                id: questionId,
                survey: {
                    id: surveyId,
                    user: {
                        id: userId
                    }
                }
            }
        },
        relations: []
    });

    if (!alternative) {
        throw new HttpError('Alternative not found or does not belong to the specified user, survey or question', 404);
    }

    await Alternative.remove(alternative);

    const updatedQuestion = await Question.findOne({
        where: { id: questionId },
        relations: ['alternatives']
    });

    if (!updatedQuestion) {
        throw new HttpError('Survey not found after deletion', 404);
    }

    return updatedQuestion;
};


export const updateSurvey = async (updateSurveyDto: UpdateSurveyDto) => {
    const { userId, surveyId, name, description, released, closingDate } = updateSurveyDto;

    const user = await User.findOne({ where: { id: userId }, relations: ['surveys'] });
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    const survey = await Survey.findOne({ where: { id: surveyId } });
    if (!survey) {
        throw new HttpError('Survey not found', 404);
    }

    // Update fields
    if (name !== undefined) {
        survey.name = name;
    }
    if (description !== undefined) {
        survey.description = description;
    }
    if (released !== undefined) {
        survey.released = released;
    }

    if (closingDate !== undefined) {
        // Assume the date is coming in `dd/mm/yyyy` format and convert it
        const [day, month, year] = closingDate.split('/');
        const formattedClosingDate = new Date(`${year}-${month}-${day}T00:00:00`);
        console.log(formattedClosingDate); // Optional: For debugging
        survey.closingDate = formattedClosingDate;
    }

    await survey.save();
    return { survey };
};



export const createQuestion = async (createQuestionDTO: CreateQuestionDTO) => {
    const { surveyId, text } = createQuestionDTO;
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

export const createAlternative = async (createAlternativeDTO: CreateAlternativeDTO) => {
    const { questionId, value } = createAlternativeDTO;
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

export const getUserSurveys = async (userId: number) => {
    // search user by id
    const user = await User.findOne({ where: { id: userId }, relations: ['surveys', 'surveys.questions', 'surveys.questions.alternatives'] });
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    return ({ surveys: user.surveys });
};



export const getAllSurveys = async () => {
    /*
    SELECT
        survey,
        question,
        alternative,
        "user".id AS user_id,
        "user".email AS user_email
    FROM
        survey
    LEFT JOIN
        question ON survey.id = question."surveyId"
    LEFT JOIN
        alternative ON question.id = alternative."questionId"
    LEFT JOIN
        "user" ON survey."userId" = "user".id;
     */
    const surveys = await Survey.createQueryBuilder('survey')
        .leftJoinAndSelect('survey.questions', 'question')
        .leftJoinAndSelect('question.alternatives', 'alternative')
        .leftJoinAndSelect('survey.user', 'user')
        .select([
            'survey',
            'question',
            'alternative',
            'user.id',
            'user.email'
        ])
        .addSelect('user.email')
        .getMany();

    return { surveys };
};


export const getUserUnasweredSurveys = async (userId: number) => {
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