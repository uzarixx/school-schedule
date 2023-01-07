import $api from "../http";


export interface LessonType {
    id?: string;
    link: string;
    dateParse: number;
    groupValues: { group: string; groupName: string };
    info: string;
}

export default class lessonsServices {
    static async getLessons(group: string) {
        return $api.post(`${process.env.REACT_APP_API_URL}/lesson-get`, {group})
    }

    static async getLessonsTeacher() {
        return $api.get(`${process.env.REACT_APP_API_URL}/lesson-get-teacher`)
    }

    static async deleteLessonById(_id: { lessonId: string }) {
        return $api.delete(`${process.env.REACT_APP_API_URL}/lesson-delete`, {data: {_id}})
    }

    static async createLesson(
        {link, dateParse, groupValues, info}: LessonType) {
        return $api.post(`${process.env.REACT_APP_API_URL}/lesson-create`, {
            link: link,
            date: dateParse,
            group: groupValues.group,
            groupName: groupValues.groupName,
            info: info
        })
    }

    static async changeLesson({id, link, dateParse, groupValues, info}: LessonType) {
        return $api.put(`${process.env.REACT_APP_API_URL}/lesson-change`, {
            _id: id,
            link: link,
            date: dateParse,
            group: groupValues.group,
            groupName: groupValues.groupName,
            info: info
        })
    }

    static async getLessonById(id: string) {
        return $api.post(`${process.env.REACT_APP_API_URL}/lesson-get-id`, {id})
    }

}
