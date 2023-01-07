import $api from "../http";


export default class authServices {
    static async registerData(email: string, username: string, password: string) {
        return $api.post(`${process.env.REACT_APP_API_URL}/signup`, {email, username, password})
    }

    static async loginData(email: string, password: string) {
        return $api.post(`${process.env.REACT_APP_API_URL}/login`, {email, password})
    }

    static async getUserData() {
        return $api.post(`${process.env.REACT_APP_API_URL}/auth-user`)
    }
}
