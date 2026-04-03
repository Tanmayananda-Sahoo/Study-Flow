const Task = require('../models/task.models.cjs');
// const {convertToMinutes, sortSchedules, detectFreeSlots} = require('../utils/timeTable.cjs');
const {calculatePriority} = require('../utils/task.cjs');

const addTask = async(req,res) => {
    const tasks = req.body.tasks;

    tasks.forEach(task => {
        if([task.title, task.subject].some((field) => field.trim() == '') || task.time <= 0 || task.duration < 0) {
            return res.status(400)
            .json({
                message: "Every field is required."
            })
        }
    })

    const formattedTasks = tasks.map(task => {
        priorityStatus = calculatePriority(task.deadline);

        return {
            user: req.user.id,
            title: task.title,
            subject: task.subject,
            duration: task.duration,
            deadline: task.deadline,
            completionStatus: 'Pending',
            priorityStatus
        }

    });

    const taskInserted = await Task.insertMany(formattedTasks);

    return res.status(200)
    .json({
        message: "Task for today is saved successfully",
        tasks: taskInserted
    })
}

const fetchTodayTask = async(req,res) => {
    if(!req.user._id) {
        return res.status(400)
        .json({
            message: "User not authorized to fetch tasks."
        })
    }
    const tasks = await Task.find({
        userId: req.user._id
    }).sort({deadline: 1})


    return res.status(200)
    .json({
        message: "All the tasks for today are fetched successfully."
    })
}

