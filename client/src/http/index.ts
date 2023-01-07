import axios from 'axios'

export const API_URL = 'http://localhost:4000/'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`
    return config;
})

export default $api