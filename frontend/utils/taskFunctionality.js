import taskAxiosInstance from './taskAxios.js'

const addTasks = async(taskData) => {
    try {
        const response = await taskAxiosInstance.post('/add', taskData);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
const fetchTask = async() => {
    try {
        const response = await taskAxiosInstance.get('/fetch');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
const updateCompletionStatus = async(id) => {
    try {
        const response = await taskAxiosInstance.get(`/update/status/${id}`);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export {
    addTasks,
    fetchTask,
    updateCompletionStatus
}