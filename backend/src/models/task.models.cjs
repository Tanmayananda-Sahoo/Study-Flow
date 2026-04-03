const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    deadline: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    completionStatus: {
        type: String,
        enum: ['Completed', 'Pending', '']
    },
    priorityStatus: {
        type: String,
        enum: ['High', 'Medium', 'Low']
    }
})

export default Task = new mongoose.model("Task", taskSchema);