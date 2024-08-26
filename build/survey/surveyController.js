"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurvey = void 0;
const getSurvey = (req, res) => {
    const surveyId = req.params.id;
    const survey = {
        surveyId: surveyId,
        description: "tangananica o tanganana??"
    };
    res.json(survey);
};
exports.getSurvey = getSurvey;
