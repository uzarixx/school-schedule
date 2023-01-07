import bcrypt from 'bcrypt'
import {getUserByEmail, createUser, getUserForAuth} from "../db/user";
import {NextFunction, Request, Response} from "express";
import {generateJWt} from "../service/generateJwt";


const AuthController = {
    signUp: async (req: Request, res: Response): Promise<any> => {
        try {
            const {username, email, password} = req.body
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({message: `Користувач з почтою ${email} вже є`})
            }
            const hashPassword = await bcrypt.hash(password, 7)
            const user = await createUser({username, email, password: hashPassword});
            const token = generateJWt(user._id, user.username, user.email, user.role, user.group)
            res.json({token})
        } catch (e) {
            console.log(e)
        }
    },
    login: async (req: Request, res: Response): Promise<any> => {
        try {
            const {email, password} = req.body;
            const existingUser = await getUserForAuth(email);
            if (!existingUser) {
                return res.status(400).json({message: `Користувач з почтою ${email} не найдено`})
            }
            const comparePassword = await bcrypt.compare(password, existingUser.password)
            if (!comparePassword) {
                return res.status(400).json({message: "Пароль не вірний"})
            }
            const token = generateJWt(existingUser._id, existingUser.username, existingUser.email, existingUser.role, existingUser.group)
            res.json({token})
        } catch (e) {
            console.log(e)
        }
    },
    authUser: async (req: any, res: Response, next: NextFunction): Promise<any> => {
        try {
            res.json(req.user)
        } catch (e) {
            console.log(e)
        }
    }
}

export default AuthController;