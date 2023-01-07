import {Lesson} from "../models";


interface CreateLessonTypes {
    link: string;
    username: string;
    id: string;
    date: string;
    group: string;
    groupName: string;
    info: string;
}

interface ChangeLessonTypes {
    _id: string;
    link: string;
    date: string;
    group: string;
    groupName: string;
    info: string;
}

interface GetLessonTypes {
    group: string;
}

export const createLesson = async ({
                                       link,
                                       date,
                                       group,
                                       groupName,
                                       info,
                                       username,
                                       id
                                   }: CreateLessonTypes): Promise<any> => {
    const lesson = await Lesson.create({link, date, group, groupName, info, username, authorId: id});
    return lesson;
};

export const changeLesson = async ({_id, link, date, group, groupName, info}: ChangeLessonTypes): Promise<any> => {
    const lesson = await Lesson.findOneAndUpdate({_id}, {link, date, group, groupName, info});
    return lesson;
}

export const deleteLesson = async (_id: string): Promise<any> => {
    const lesson = await Lesson.deleteOne({_id});
    return lesson
}


export const getLesson = async ({group}: GetLessonTypes): Promise<any> => {
    const lesson = await Lesson.find({group: group, date: {$gte: Date.now()}}).sort({"date": 1});
    return lesson;
};

export const getLessonByAuthorId = async ({id}: { id: string }): Promise<any> => {
    const lesson = await Lesson.find({authorId: id, date: {$gte: Date.now()}}).sort({"date": 1});
    return lesson;
}

export const getLessonById = async ({id}: { id: string }): Promise<any> => {
    const lesson = await Lesson.find({_id: id})
    return lesson
}

