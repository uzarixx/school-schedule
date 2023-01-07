import $api from "../http";


export default class groupsServices {
    static async getGroups() {
        return $api.get(`${process.env.REACT_APP_API_URL}/group-get`)
    }

}
