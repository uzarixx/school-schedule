import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true
        },
        role: {
            type: String,
            default: 'Student'
        },
        group: {
            type: String,
            default: ''
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    group: string;
}

export default mongoose.model<IUser>('User', UserSchema)