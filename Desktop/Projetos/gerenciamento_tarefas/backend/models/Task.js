// backend/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String },
    time: { type: String },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);
