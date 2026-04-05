const express = require('express');
const {addTimeTableEntry, getTimeTable, getFreeSlots, generateSchedule} = require('../controllers/timetable.controllers.cjs');
const {isUserAuthenticated} = require('../middlewares/auth.middlewares.cjs');

const timeTableRouter = express.Router();

timeTableRouter.route('/add').post(isUserAuthenticated, addTimeTableEntry);
timeTableRouter.route('/get').get(isUserAuthenticated, getTimeTable);
timeTableRouter.route('/get/freeslots').get(isUserAuthenticated, getFreeSlots);
timeTableRouter.route('/get/schedule').get(isUserAuthenticated, generateSchedule);

module.exports = {
    timeTableRouter
};