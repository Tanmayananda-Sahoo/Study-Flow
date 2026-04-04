const Timetable = require('../models/timetable.models.cjs');

const convertToMinutes = async (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return 60 * hours + minutes;
};

const sortSchedules = async () => {
  schedules.sort(
    (a, b) => convertToMinutes(a.startTime) - convertToMinutes(b.startTime),
  );
};

// function detectFreeSlots(schedules) {
//   const freeSlots = [];

//   let startOfDay = 0;
//   let endOfDay = 1440;

//   let previousEnd = startOfDay;

//   for (let schedule of schedules) {
//     const start = convertToMinutes(schedule.startTime);
//     const end = convertToMinutes(schedule.endTime);

//     if (start > previousEnd) {
//       freeSlots.push({
//         start: previousEnd,
//         end: start,
//       });
//     }

//     previousEnd = end;
//   }

//   if (previousEnd < endOfDay) {
//     freeSlots.push({
//       start: previousEnd,
//       end: endOfDay,
//     });
//   }

//   return freeSlots;
// }

const fetchFreeSlots = async() => {
  const id = req.user._id;
  if (!id) {
    return res.status(400).json({
      message: "User not authenticated.",
    });
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const timeTable = await Timetable.find({
    userId: req.user._id,
    $or: [
      { dayOfWeek: todayDay, isRecurring: true },
      { specificDate: { $gte: start, $lte: end }, isRecurring: false },
    ],
  }).sort({ startTime: 1 });

  const startOfDay = 8;
  const endOfDay = 23;

  let freeSlots = [];

  let currentTime = startOfDay;

  timeTable.map((time) => {
    if (currentTime < time.startTime) {
      freeSlots.push({
        start: currentTime,
        end: time.startTime,
      });
    }

    currentTime = time.startTime;
  });

  if (currentTime < endOfDay) {
    freeSlots.push({
      start: currentTime,
      end: endOfDay,
    });
  }

  return freeSlots;
}
module.exports = {
  convertToMinutes,
  sortSchedules,
  fetchFreeSlots,
};
