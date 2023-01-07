import {ForgotTokens} from "../models";

export const createForgotToken = async ({userId, token, expiresAt}: {userId: string, token: string, expiresAt: string}): Promise<any> => {
    const forgotToken = await ForgotTokens.create({userId, token, expiresAt})
    return forgotToken;
}

export const getUserByForgotToken = async ({token}: { token: string }): Promise<any> => {
    const user = await ForgotTokens.findOne({token})
    return user
}