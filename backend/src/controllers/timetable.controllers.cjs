const Timetable = require("../models/timetableModel.cjs");
const fetchFreeSlots = require("../utils/timeTable.cjs");
const fetchTask = require("../utils/task.cjs");
//complete untested
const addTimeTableEntry = async (req, res) => {
  const { title, startTime, endTime, isRecurring, venue } = req.body;

  if (
    [title, startTime, endTime, isRecurring, venue].some(
      (field) => field.trim() == "",
    )
  ) {
    return res.status(400).json({
      message: "All the fields are required.",
    });
  }

  const userId = req.user._id;
  if (!userId) {
    return res.status("User is unauthorized to add time table.");
  }

  const today = new Date();
  const todayDay = today.getDay();

  const timeTable = await Timetable.create({
    title,
    startTime,
    endTime,
    venue,
    dayOfWeek: isRecurring ? todayDay : null,
    specificDate: isRecurring ? null : today,
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

//complete untested
const getTimeTable = async (req, res) => {
  try {
    const today = new Date();
    const todayDay = today.getDay();

    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const timeTable = await Timetable.find({
      userId: req.user._id,
      $or: [
        { dayOfWeek: todayDay, isRecurring: true },
        { specificDate: today, isRecurring: false },
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

const getFreeSlots = async (req, res) => {
  const freeSlots = fetchFreeSlots();
  return res.status(200).json({
    message: "Free time slots fetched successfully.",
    freeSlots,
  });
};

const generateSchedule = async () => {
  const priorityMap = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  const freeSlots = await fetchFreeSlots();
  const tasks = await fetchTask();

  tasks.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);

  const schedule = [];

  for (const task of tasks) {
    for (const slot of freeSlots) {
      const slotDuration = slot.end - slot.start;

      if (slotDuration >= task.duration) {
        schedule.push({
          task: task.title,
          start: slot.start,
          end: slot.start + task.duration,
        });

        slot.start += task.duration;

        break;
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
  generateSchedule
};
