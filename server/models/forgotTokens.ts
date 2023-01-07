import mongoose from "mongoose";
const Schema = mongoose.Schema

const ForgotTokensSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

export interface IForgotToken extends Document {
    userId: string;
    token: string;
    expiresAt: string;
}

export default mongoose.model<IForgotToken>('ForgotTokens', ForgotTokensSchema)