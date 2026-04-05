import axios from 'axios';

const userAxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/user/auth/v1',
    withCredentials: true
})

export default userAxiosInstance;