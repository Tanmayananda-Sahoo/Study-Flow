const {Timetable} = require("../models/timetable.models.cjs");
const {fetchFreeSlots, getNextDateForDay, formatDay, fetchTodayTimeTable} = require("../utils/timeTable.cjs");
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
    const id = req.user._id;

    const timeTable = await fetchTodayTimeTable(id);
    return res.status(200).json({
      message: "Default time table fetched successfully.",
      TimeTable: timeTable,
    });
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


const generateSchedule = async (req, res) => {

  const id = req.user._id;

  const freeSlots = await fetchFreeSlots(id);
  const tasks = await fetchTask(id);
  const classes = await fetchTodayTimeTable(id);

  const priorityRank = {
    'High': 3,
    'Medium': 2,
    'Low': 1
  };

  const pendingTasks = tasks.filter(
    task => task.completionStatus === "Pending"
  );

  pendingTasks.sort(
    (a, b) => priorityRank[b.priorityStatus] - priorityRank[a.priorityStatus]
  );

  const schedule = [];

  // -----------------------
  // 1️⃣ Add Classes First
  // -----------------------

  for (const c of classes) {

    schedule.push({
      type: "class",
      title: c.subject,
      subject: c.subject,
      startTime: convertToMinutes(c.startTime),
      endTime: convertToMinutes(c.endTime)
    });

  }

  // -----------------------
  // 2️⃣ Schedule Tasks
  // -----------------------

  for (const slot of freeSlots) {

    let slotStart = convertToMinutes(slot.start);
    const slotEnd = convertToMinutes(slot.end);

    for (const task of pendingTasks) {

      if (task.scheduled) continue;

      const taskDuration = Number(task.time);

      if (slotStart + taskDuration <= slotEnd) {

        schedule.push({
          type: "task",
          taskId: task._id,
          title: task.title,
          subject: task.subject,
          startTime: slotStart,
          endTime: slotStart + taskDuration,
          priorityStatus: task.priorityStatus
        });

        slotStart += taskDuration;

        task.scheduled = true;

        // -----------------------
        // 3️⃣ Add Break
        // -----------------------

        const breakDuration = 10;

        if (slotStart + breakDuration <= slotEnd) {

          schedule.push({
            type: "break",
            title: "Break",
            startTime: slotStart,
            endTime: slotStart + breakDuration
          });

          slotStart += breakDuration;

        }

      }

    }

  }

  // -----------------------
  // 4️⃣ Sort Schedule
  // -----------------------

  schedule.sort((a, b) => a.startTime - b.startTime);

  // -----------------------
  // 5️⃣ Convert Time Format
  // -----------------------

  const finalSchedule = schedule.map(item => ({
    ...item,
    startTime: minutesToTime(item.startTime),
    endTime: minutesToTime(item.endTime)
  }));
  console.log(finalSchedule)
  return res.status(200).json({
    message: "Your schedule for today is successfully created.",
    schedule: finalSchedule
  });

};

module.exports = {
  addTimeTableEntry,
  getTimeTable,
  getFreeSlots,
  generateSchedule,
  getTodayTimeTable
};
