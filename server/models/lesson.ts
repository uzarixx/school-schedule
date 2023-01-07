import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LessonSchema = new Schema(
    {
        link: {
            type: String,
            required: true,
        },
        username: {
            type: String,
        },
        authorId: {
            type: String
        },
        date: {
            type: String,
        },
        group: {
            type: String
        },
        groupName: {
          type: String
        },
        info: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

export interface ILesson extends Document {
    username: string;
    authorId: string;
    link: string;
    date: string;
    group: string;
    groupName: string;
    info: string;
}

export default mongoose.model<ILesson>('Lesson', LessonSchema)