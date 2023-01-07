import $api from "../http";


export default class studentService {
    static async getAllStudents() {
        return $api.get(`${process.env.REACT_APP_API_URL}/get-all-students`)
    }

    static async changeGroupStudent(_id: string, group: string) {
        return $api.put(`${process.env.REACT_APP_API_URL}/change-group-student`, {_id, group})
    }

    static async deleteStudent(_id: string) {
        return $api.delete(`${process.env.REACT_APP_API_URL}/delete-student`, {data: {_id}})
    }

    static async forgotPassword(email: string) {
        return $api.post(`${process.env.REACT_APP_API_URL}/create-forgot-token`, {email})
    }

    static async changeForgotPassword({token, password}: {token: string, password: string}) {
        return $api.post(`${process.env.REACT_APP_API_URL}/change-forgot-password`, {token, password})
    }

}