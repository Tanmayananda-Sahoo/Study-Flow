const Timetable = require("../models/timetableModel.cjs");
const {convertToMinutes, sortSchedules, detectFreeSlots} = require('../utils/timeTable.cjs');

const addTimeTableEntry = async(req,res) => {
    const {title, startTime, endTime, isRecurring} = req.body;

    if([title, startTime, endTime, isRecurring].some((field) => field.trim() == "")) {
      return res.status(400)
      .json({
        message: 'All the fields are required.'
      })
    }

    const date = new Date();
    const dayOfTheWeek = date.getDay();
    
    

}

const getDefaultSchedule = async (req, res) => {
  try {
    const today = new Date();
    const todayDay = today.getDay();

    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const schedules = await Timetable.find({
      userId: req.user._id,
      $or: [
        { dayOfWeek: todayDay, isRecurring: true },
        {
          specificDate: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      ],
    });

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodaySchedule = async(req,res) => {
    
}

export {addTimeTableEntry, getDefaultSchedule, getTodaySchedule};