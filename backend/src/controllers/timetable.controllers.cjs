const {Timetable} = require("../models/timetable.models.cjs");
const {fetchFreeSlots, getNextDateForDay} = require("../utils/timeTable.cjs");
const {fetchTask} = require("../utils/task.cjs");

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
