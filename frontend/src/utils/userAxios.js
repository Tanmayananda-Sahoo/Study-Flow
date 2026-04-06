import axios from 'axios';

const userAxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/users/auth/v1',
    withCredentials: true
})

export default userAxiosInstance;