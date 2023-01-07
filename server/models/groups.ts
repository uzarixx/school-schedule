import mongoose from 'mongoose'

const Schema = mongoose.Schema

const GroupsSchema = new Schema(
    {
        group: {
          type: String
        },
        name: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

export interface ILesson extends Document {
    group: string;
    name: string;
}

export default mongoose.model<ILesson>('Groups', GroupsSchema)