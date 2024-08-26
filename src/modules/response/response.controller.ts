import { Request, Response } from 'express';
import { sendResponseSurvey } from './response.service';



export const sendResponseSurveyController = async (req: Request, res: Response) => {
    //  {userId, surveyId, [selectedAlternative1Id, selectedAlternative2Id, selectedAlternative3Id]}
    const { userId, surveyId, selectedAlternatives } = req.body;
    console.log(userId, surveyId, selectedAlternatives);
    
    const result = await sendResponseSurvey("1", "2" ,["1","4","6"], false);
    return res.status(200).json({ result });

};

