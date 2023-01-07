import {AuthController, LessonController, UsersController} from '../controllers'
import {Router} from "express";
import authUser from '../middlewares/authMiddleware'
import {checkIfTeacher, checkIfStudent} from "../middlewares/checkRole";
import GroupsController from "../controllers/groups";

const router = Router()


/*
Authorization
 */
router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);
router.post('/auth-user', authUser, AuthController.authUser)


/*
users
 */
router.post('/create-forgot-token', UsersController.createForgotToken)
router.post('/change-forgot-password', UsersController.changeForgotPassword)
router.get('/get-all-students', checkIfTeacher, UsersController.getAllStudents)
router.put('/change-group-student', checkIfTeacher, UsersController.changeGroupStudent)
router.delete('/delete-student', checkIfTeacher, UsersController.deleteStudent)


/*
Lesson
 */
router.post('/lesson-create', checkIfTeacher, LessonController.lessonCreate)
router.post('/lesson-get-id', checkIfTeacher, LessonController.lessonGetById)
router.post('/lesson-get', checkIfStudent, LessonController.lessonGet)
router.get('/lesson-get-teacher', checkIfTeacher, LessonController.lessonGetTeacher)
router.put('/lesson-change', checkIfTeacher, LessonController.lessonChange)
router.delete('/lesson-delete', checkIfTeacher, LessonController.deleteLesson)


/*
Groups
 */
router.post('/group-create', checkIfTeacher, GroupsController.groupCreate)
router.get('/group-get', checkIfTeacher, GroupsController.groupGet)


export default router;