"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lesson_1 = require("../db/lesson");
const LessonController = {
    lessonCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { link, date, group, groupName, info } = req.body;
            const { username, id } = req.user;
            const lesson = yield (0, lesson_1.createLesson)({ link, date, group, groupName, info, username, id });
            res.json(lesson);
        }
        catch (e) {
            console.log(e);
        }
    }),
    lessonGet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { group } = req.body;
        const lessons = yield (0, lesson_1.getLesson)({ group });
        res.json(lessons);
    }),
    lessonGetTeacher: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.user;
        const lessons = yield (0, lesson_1.getLessonByAuthorId)({ id });
        res.json(lessons);
    }),
    lessonGetById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const lesson = yield (0, lesson_1.getLessonById)({ id });
        res.json(lesson);
    }),
    lessonChange: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, link, date, group, groupName, info } = req.body;
        const lesson = yield (0, lesson_1.changeLesson)({ _id, link, date, group, groupName, info });
        res.json(lesson);
    }),
    deleteLesson: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.body;
        const lesson = yield (0, lesson_1.deleteLesson)(_id);
        res.json('Пара видалена');
    })
};
exports.default = LessonController;
