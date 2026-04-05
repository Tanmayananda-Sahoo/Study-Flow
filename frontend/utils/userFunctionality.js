import userAxiosInstance from './userAxios.js';

const register = async(userData) => {
    try {
        const response = await userAxiosInstance.post('/register', userData);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

const login = async(userData) => {
    try {
        const response = await userAxiosInstance.post('/login', userData);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

const updatePassword = async(userData) => {
    try {
        const response = await userAxiosInstance.post('/update/password', userData);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
export {
    register,
    login,
    updatePassword
}