"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyRoutes = void 0;
const express_1 = require("express");
const surveyController_1 = require("./surveyController");
exports.surveyRoutes = (0, express_1.Router)();
exports.surveyRoutes.get('/:id', surveyController_1.getSurvey);
