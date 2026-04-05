import axios from 'axios';

const taskAxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/tasks/v1',
    withCredentials: true
})

export default taskAxiosInstance;