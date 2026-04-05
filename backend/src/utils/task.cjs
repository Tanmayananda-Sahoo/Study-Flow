const {Task} = require('../models/task.models.cjs');

const calculatePriority = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);

    const dayDiff = (deadlineDate - today)/(1000*60*60*24);

    if(dayDiff <= 1) return "High"
    else if(dayDiff <= 3) return "Medium"

    return "Low";
}

const fetchTask = async(id) => {
    if(!id) {
        return res.status(400)
        .json({
            message: "User not authorized to fetch tasks."
        })
    }
    const tasks = await Task.find({
        userId: id
    }).sort({deadline: 1})

    console.log(tasks);

    await Promise.all(tasks.map(async(task) => {
        const newPriority = calculatePriority(task.deadline);
        if(newPriority != task.priorityStatus) {
            await Task.findByIdAndUpdate(
                task._id,
                {priorityStatus: newPriority},
                {new:true}
            )
        }
    }))
    console.log(tasks);
    return tasks;
}
module.exports = {
    calculatePriority,
    fetchTask
}