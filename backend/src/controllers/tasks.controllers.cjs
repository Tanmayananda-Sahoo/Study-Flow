const Task = require('../models/task.models.cjs');
// const {convertToMinutes, sortSchedules, detectFreeSlots} = require('../utils/timeTable.cjs');
const {calculatePriority, fetchTask} = require('../utils/task.cjs');

const addTask = async (req, res) => {
  try {

    const { title, startTime, endTime, subject, deadline } = req.body;

    // Validation
    if (
      !title?.trim() ||
      !startTime?.trim() ||
      !endTime?.trim() ||
      !subject?.trim() ||
      !deadline ||
      deadline <= 0
    ) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    // Calculate duration
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    const duration = (end - start) / (1000 * 60); // minutes

    if (duration <= 0) {
      return res.status(400).json({
        message: "End time must be greater than start time."
      });
    }

    // Calculate priority
    const priorityStatus = calculatePriority(deadline);

    const newTask = await Task.create({
      user: req.user.id,
      title,
      subject,
      startTime,
      endTime,
      duration,
      deadline,
      completionStatus: "Pending",
      priorityStatus
    });

    return res.status(201).json({
      message: "Task added successfully.",
      task: newTask
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error adding task",
      error: error.message
    });
  }
};

const fetchTodayTask = async(req,res) => {
    const tasks = fetchTask();
    
    return res.status(200)
    .json({
        message: "All the tasks for today are fetched successfully.",
        tasks
    })
}

const updateTaskStatus = async(req,res) => {
    const {id} = req.params;
    const {completionStatus} = req.body;

    if(!id) {
        return res.status(400)
        .json({
            message: "Please select a task to update."
        })
    }

    const task = await Task.findByIdAndUpdate(
        id,
        {completionStatus},
        {new:true}
    )

    if(!task) {
        return res.status(400)
        .json({
            message: "Task could not be updated."
        })
    }

    return res.statu(200)
    .json({
        message: "Task updated successfully.",
        task
    })
}

module.exports = {
    addTask,
    fetchTodayTask,
    updateTaskStatus
}