const {Timetable} = require("../models/timetable.models.cjs");
const {fetchFreeSlots, getNextDateForDay, formatDay} = require("../utils/timeTable.cjs");
const {fetchTask} = require("../utils/task.cjs");
const {Task} = require('../models/task.models.cjs');
const {convertToMinutes, minutesToTime} = require('../utils/general.cjs');
//complete and tested
const addTimeTableEntry = async (req, res) => {
  const { title, day, startTime, endTime, isRecurring, venue } = req.body;

  if([title, startTime, endTime, venue].some((field) => field.trim() == "")) {
      return res.status(400).json({
        message: "All the fields are required.",
      });
  }

  const userId = req.user._id;
  if (!userId) {
    return res.status("User is unauthorized to add time table.");
  }

  const dateUpcoming = getNextDateForDay(day);

  console.log(dateUpcoming)

  const timeTable = await Timetable.create({
    title,
    startTime,
    endTime,
    venue,
    dayOfWeek: isRecurring ? day : null,
    specificDate: isRecurring ? null : dateUpcoming,
    userId: req.user._id
  });

  if (!timeTable) {
    return res.status(400).json({
      message:
        "There is a problem with creating time table. Please try once again.",
    });
  }

  return res.status(200).json({
    message: "Time table created successfully.",
    TimeTable: timeTable,
  });
};

//complete and tested
const getTimeTable = async (req, res) => {
  try {
    const today = new Date();
    const todayDay = today.getDay();

    let startOfDay = new Date(today.setHours(0, 0, 0, 0));
    let endOfDay = new Date(today.setHours(23, 59, 59, 999));

    startOfDay = startOfDay.toLocaleDateString("en-GB");
    endOfDay = endOfDay.toLocaleDateString("en-GB");

    const timeTable = await Timetable.find({
      userId: req.user._id,
      $or: [
        { isRecurring: true },
        { specificDate: {$gte: today}, isRecurring: false },
      ],
    }).sort({ startTime: 1 });

    return res.status(200).json({
      message: "Default time table fetched successfully.",
      TimeTable: timeTable,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodayTimeTable = async (req, res) => {
  try {
    let today = new Date();
    const todayDay = today.getDay();

    let startOfDay = new Date(today.setHours(0, 0, 0, 0));
    let endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todayDate = today.toLocaleDateString("en-GB");
    startOfDay = startOfDay.toLocaleDateString("en-GB");
    endOfDay = endOfDay.toLocaleDateString("en-GB");

    const timeTable = await Timetable.find({
      userId: req.user._id,
      $or: [
        { isRecurring: true, dayOfWeek: formatDay(today.getDay())},
        { specificDate: todayDate, isRecurring: false },
      ],
    }).sort({ startTime: 1 });

    return res.status(200).json({
      message: "Default time table fetched successfully.",
      TimeTable: timeTable,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//complete and tested
const getFreeSlots = async (req, res) => {
  const id = req.user._id;
  const freeSlots = await fetchFreeSlots(id);
  // console.log(freeSlots);
  return res.status(200).json({
    message: "Free time slots fetched successfully.",
    freeSlots,
  });
};


const generateSchedule = async (req,res) => {
  const priorityMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
  const id = req.user._id;
  const freeSlots = await fetchFreeSlots(id);
  const tasks = await fetchTask(id);

  const pendingTasks = tasks.filter(
    task => task.completionStatus === "Pending"
  );

  // Priority ranking
  const priorityRank = {
    'High': 3,
    'Medium': 2,
    'Low': 1
  };
  
  // Sort tasks by priority
  pendingTasks.sort(
    (a, b) => priorityRank[b.priorityStatus] - priorityRank[a.priorityStatus]
  );
  
  // console.log("Pending Task: ", pendingTasks);
  const schedule = [];

  for (const slot of freeSlots) {

    console.log("Slot: ", slot);
    let slotStart = convertToMinutes(slot.start);
    let slotEnd = convertToMinutes(slot.end);
    
    for (const task of pendingTasks) {

      if(task.scheduled) continue;
      console.log("Task: ", task);
      const taskDuration = Number(task.time);

      if (slotStart + taskDuration <= slotEnd) {

        schedule.push({
          taskId: task._id,
          title: task.title,
          subject: task.subject,
          startTime: minutesToTime(slotStart),
          endTime: minutesToTime(slotStart + taskDuration),
          priorityStatus: task.priorityStatus
        });

        slotStart += taskDuration;

        task.scheduled = false;
      }
    }
  }

  return res.status(200)
  .json({
    message: "Your schedule for today is successfully created.",
    schedule
  });
};

module.exports = {
  addTimeTableEntry,
  getTimeTable,
  getFreeSlots,
  generateSchedule,
  getTodayTimeTable
};
