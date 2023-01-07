import jwt from 'jsonwebtoken'
import {NextFunction, Response} from "express";


export async function checkIfTeacher(req: any, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Ви не авторізовані"})
        }
        const secret = process.env.SECRET_KEY
        const decoded: any = jwt.verify(token, secret)
        if (!decoded) return res.status(401).json({message: "Ви не авторізовані"})
        if (decoded.role !== 'Teacher') {
            return res.status(403).json('Ви не викладач')
        }
        req.user = decoded
        next()
    } catch (e) {
        console.log(e)
    }
};

export async function checkIfStudent(req: any, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Ви не авторізовані"})
        }
        const secret = process.env.SECRET_KEY
        const decoded: any = jwt.verify(token, secret)
        if (!decoded) return res.status(401).json({message: "Ви не авторізовані"})
        if (decoded.role !== 'Student') {
            return res.status(403).json('Ви не студент')
        }
        req.user = decoded
        next()
    } catch (e) {
        console.log(e)
    }
}