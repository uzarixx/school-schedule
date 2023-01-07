"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const checkRole_1 = require("../middlewares/checkRole");
const groups_1 = __importDefault(require("../controllers/groups"));
const router = (0, express_1.Router)();
/*
Authorization
 */
router.post('/signup', controllers_1.AuthController.signUp);
router.post('/login', controllers_1.AuthController.login);
router.post('/auth-user', authMiddleware_1.default, controllers_1.AuthController.authUser);
/*
users
 */
router.post('/create-forgot-token', controllers_1.UsersController.createForgotToken);
router.post('/change-forgot-password', controllers_1.UsersController.changeForgotPassword);
router.get('/get-all-students', checkRole_1.checkIfTeacher, controllers_1.UsersController.getAllStudents);
router.put('/change-group-student', checkRole_1.checkIfTeacher, controllers_1.UsersController.changeGroupStudent);
router.delete('/delete-student', checkRole_1.checkIfTeacher, controllers_1.UsersController.deleteStudent);
/*
Lesson
 */
router.post('/lesson-create', checkRole_1.checkIfTeacher, controllers_1.LessonController.lessonCreate);
router.post('/lesson-get-id', checkRole_1.checkIfTeacher, controllers_1.LessonController.lessonGetById);
router.post('/lesson-get', checkRole_1.checkIfStudent, controllers_1.LessonController.lessonGet);
router.get('/lesson-get-teacher', checkRole_1.checkIfTeacher, controllers_1.LessonController.lessonGetTeacher);
router.put('/lesson-change', checkRole_1.checkIfTeacher, controllers_1.LessonController.lessonChange);
router.delete('/lesson-delete', checkRole_1.checkIfTeacher, controllers_1.LessonController.deleteLesson);
/*
Groups
 */
router.post('/group-create', checkRole_1.checkIfTeacher, groups_1.default.groupCreate);
router.get('/group-get', checkRole_1.checkIfTeacher, groups_1.default.groupGet);
exports.default = router;
