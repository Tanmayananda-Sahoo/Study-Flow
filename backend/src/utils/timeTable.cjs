const convertToMinutes = async (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return 60 * hours + minutes;
};

const sortSchedules = async () => {
  schedules.sort(
    (a, b) => convertToMinutes(a.startTime) - convertToMinutes(b.startTime),
  );
};

function detectFreeSlots(schedules) {
  const freeSlots = [];

  let startOfDay = 0;
  let endOfDay = 1440;

  let previousEnd = startOfDay;

  for (let schedule of schedules) {
    const start = convertToMinutes(schedule.startTime);
    const end = convertToMinutes(schedule.endTime);

    if (start > previousEnd) {
      freeSlots.push({
        start: previousEnd,
        end: start,
      });
    }

    previousEnd = end;
  }

  if (previousEnd < endOfDay) {
    freeSlots.push({
      start: previousEnd,
      end: endOfDay,
    });
  }

  return freeSlots;
}

module.exports = {
  convertToMinutes,
  sortSchedules, 
  detectFreeSlots
};