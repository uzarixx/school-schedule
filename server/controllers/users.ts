import {Request, Response} from "express";
import {changeGroupStudent, deleteStudent, getUserByEmail, getUsersByRole, userUpdatePassword} from "../db/user";
import * as uuid from 'uuid'
import {createForgotToken, getUserByForgotToken} from "../db/forgotTokens";
import {sendEmail} from "../service/email";
import bcrypt from "bcrypt";
import {generateJWt} from "../service/generateJwt";


const UsersController = {
    getAllStudents: async (req: Request, res: Response): Promise<any> => {
        try {
            const students = await getUsersByRole('Student')
            res.json(students)
        } catch (e) {
            console.log(e)
        }
    },
    changeGroupStudent: async (req: Request, res: Response): Promise<any> => {
        try {
            const {_id, group} = req.body
            const student = await changeGroupStudent(_id, group)
            res.json({student})
        } catch (e) {
            console.log(e)
        }
    },
    deleteStudent: async (req: Request, res: Response): Promise<any> => {
        try {
            const {_id} = req.body
            const student = await deleteStudent(_id)
            res.json('Студент видален')
        } catch (e) {
            console.log(e)
        }
    },
    createForgotToken: async (req: Request, res: Response): Promise<any> => {
        try {
            const {email} = req.body
            const candidate = await getUserByEmail(email)
            if (!candidate) {
                res.status(404).json({message: 'Користувач не знайден.'})
            }
            const forgotLink = uuid.v4();
            const forgotToken = await createForgotToken({
                userId: candidate._id,
                token: forgotLink,
                expiresAt: String(Date.now() + 1000 * 60 * 5)
            })
            await sendEmail({to: email, link: `http://localhost:3000/forgot?key=${forgotLink}`})
            res.json('Повідомлення надіслано на вашу пошту')
        } catch (e) {
            console.log(e)
        }
    },
    changeForgotPassword: async (req: Request, res: Response): Promise<any> => {
        try {
            const {token, password} = req.body
            const user = await getUserByForgotToken({token})
            if (!user) {
                return res.status(400).json({message: "Помилка даних"})
            }
            let jwtToken
            if (user.expiresAt > Date.now()) {
                const hashPassword = await bcrypt.hash(password, 7)
                const userUpdate = await userUpdatePassword({_id: user.userId, password: hashPassword})
                jwtToken = generateJWt(userUpdate._id, userUpdate.username, userUpdate.email, userUpdate.role, userUpdate.group)
                res.json(jwtToken)
            }else {
                return res.status(400).json({message: "Помилка даних"})
            }
            res.json('Виконанно')
        } catch (e) {
            console.log(e)
        }
    },
}

export default UsersController;