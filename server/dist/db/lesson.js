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
exports.getLessonById = exports.getLessonByAuthorId = exports.getLesson = exports.deleteLesson = exports.changeLesson = exports.createLesson = void 0;
const models_1 = require("../models");
const createLesson = ({ link, date, group, groupName, info, username, id }) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield models_1.Lesson.create({ link, date, group, groupName, info, username, authorId: id });
    return lesson;
});
exports.createLesson = createLesson;
const changeLesson = ({ _id, link, date, group, groupName, info }) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield models_1.Lesson.findOneAndUpdate({ _id }, { link, date, group, groupName, info });
    return lesson;
});
exports.changeLesson = changeLesson;
const deleteLesson = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield models_1.Lesson.deleteOne({ _id });
    return lesson;
});
exports.deleteLesson = deleteLesson;
const getLesson = ({ group }) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield models_1.Lesson.find({ group: group, date: { $gte: Date.now() } }).sort({ "date": 1 });
    return lesson;
});
exports.getLesson = getLesson;
const getLessonByAuthorId = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield models_1.Lesson.find({ authorId: id, date: { $gte: Date.now() } }).sort({ "date": 1 });
    return lesson;
});
exports.getLessonByAuthorId = getLessonByAuthorId;
const getLessonById = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield models_1.Lesson.find({ _id: id });
    return lesson;
});
exports.getLessonById = getLessonById;
