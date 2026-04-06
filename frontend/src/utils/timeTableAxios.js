import axios from 'axios';

const timeTableAxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/timetables/v1',
    withCredentials: true
})

export default timeTableAxiosInstance;