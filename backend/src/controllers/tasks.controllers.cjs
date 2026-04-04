const Task = require('../models/task.models.cjs');
// const {convertToMinutes, sortSchedules, detectFreeSlots} = require('../utils/timeTable.cjs');
const {calculatePriority, fetchTask} = require('../utils/task.cjs');

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