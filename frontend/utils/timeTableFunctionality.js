import timeTableAxiosInstance from './timeTableAxios.js';

const addTimeTable = async(timeTableData) => {
    try {
        const response = await timeTableAxiosInstance.post('/add', timeTableData);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
const getTimeTable = async() => {
    try {
        const response = await timeTableAxiosInstance.get('/get');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
const getFreeSlots = async() => {
    try {
        const response = await timeTableAxiosInstance.get('/get/freeslots');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export {
    addTimeTable,
    getTimeTable,
    getFreeSlots
}