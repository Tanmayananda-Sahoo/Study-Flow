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
        console.log("Time Table: ", response);
    } catch (error) {
        console.error(error);
    }
}
const getFreeSlots = async() => {
    try {
        const response = await timeTableAxiosInstance.get('/get/freeslots');
        console.log("Today's free slots:", response);
        return response;
    } catch (error) {
        console.error(error);
    }
}
const getTodayTimeTable = async() => {
    try {
        const response = await timeTableAxiosInstance.get('/get/todaytimetable');
        console.log("Today Time table: ", response);
        return response;
    } catch (error) {
        console.error(error);
    }
}
const getSchedule = async() => {
    const response = await timeTableAxiosInstance.get('/get/schedule');
    console.log("Get Schedule response: ", response);
    return response;    
}
export {
    addTimeTable,
    getTimeTable,
    getFreeSlots,
    getTodayTimeTable
}