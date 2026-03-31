const express = require('express');
const {addTimeTableEntry, getTodaySchedule, getDefaultSchedule} = require('../controllers/timetable.controllers.cjs');
const isUserAuthenticated = require('../middlewares/auth.middlewares.cjs');

const router = express.Router();

router.route('/add').post(isUserAuthenticated, addTimeTableEntry);
router.route('/get').get(isUserAuthenticated, getTodaySchedule);
router.route('/get-default').get(isUserAuthenticated, getDefaultSchedule);

export default router;