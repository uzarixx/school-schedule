import {NextFunction, Request, Response} from "express";
import {changeLesson, createLesson, deleteLesson, getLesson, getLessonByAuthorId, getLessonById} from "../db/lesson";


const LessonController = {
    lessonCreate: async (req: any, res: Response): Promise<any> => {
        try {
            const {link, date, group, groupName, info} = req.body
            const {username, id} = req.user
            const lesson = await createLesson({link, date, group, groupName, info, username, id})
            res.json(lesson)
        } catch (e) {
            console.log(e)
        }
    },
    lessonGet: async (req: any, res: Response): Promise<any> => {
        const {group} = req.body
        const lessons = await getLesson({group})
        res.json(lessons)
    },
    lessonGetTeacher: async (req: any, res: Response): Promise<any> => {
        const {id} = req.user
        const lessons = await getLessonByAuthorId({id})
        res.json(lessons)
    },
    lessonGetById: async (req: Request, res: Response): Promise<any> => {
        const {id} = req.body
        const lesson = await getLessonById({id})
        res.json(lesson)
    },
    lessonChange: async (req: Request, res: Response): Promise<any> => {
        const {_id, link, date, group, groupName, info} = req.body
        const lesson = await changeLesson({_id, link, date, group, groupName, info})
        res.json(lesson)
    },
    deleteLesson: async (req: Request, res: Response): Promise<any> => {
        const {_id} = req.body
        const lesson = await deleteLesson(_id)
        res.json('Пара видалена')
    }
}

export default LessonController;