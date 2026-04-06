import userAxiosInstance from './userAxios.js';

const register = async(userData) => {
    try {
        const response = await userAxiosInstance.post('/register', userData);
        console.log(response.data.user);
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

const fetchUser = async() => {
    try {
        const response = await userAxiosInstance.get('/fetch');
        console.log('User response:', response);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export {
    register,
    login,
    updatePassword,
    fetchUser
}