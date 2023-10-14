const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    text: String,
    isComplete: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true })

const Todo = mongoose.model("todo", todoSchema)

module.exports = Todo