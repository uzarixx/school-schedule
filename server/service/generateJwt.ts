import jwt from "jsonwebtoken";

export const generateJWt = (id: string, username: string, email: string, role: string, group: string) => {
    return jwt.sign(
        {id, username, email, role, group},
        process.env.SECRET_KEY,
        {expiresIn: '30d'}
    )
}