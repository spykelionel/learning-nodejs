const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();


app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
    Todo endpoints:
    /todos - Get all todos :DONE
    /todos/:id - Get a single todo :DONE
    /todos/create - Create a todo :DONE
    /todos/update/:id - Update a single todo :DONE
    /todos/delete/:id - Delete a single todo?
Todo.findOneAndDelete({_id: id})
    .then(deleted=>{
        Todo.find({})
            .then(todos=>res.status(200).json(todos))
            .catch(error=>res.status(500).json(error))
    })
*/

const todoSchema = new mongoose.Schema({
    text: String,
    isComplete: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const Todo = mongoose.model("todo", todoSchema)


const getAllTodos = (req, res) => {
    Todo.find({})
        .then((todos) => {
            return res.json({ todos })
        })
        .catch(error => {
            return res.json({ error })
        })
}

const getSingleTodo = (req, res) => {
    const { id } = req.params
    Todo.findOne({ _id: id })
        .then((todo) => {
            return res.json({ todo })
        })
        .catch(error => {
            return res.json({ error })
        })
}

const createSingleTodo = (req, res) => {
    console.log(req.body)
    const { text } = req.body
    // const todo = new Todo({text: text})
    const todo = new Todo({ text })
    todo.save()
        .then(savedTodo => {
            return res.json({ todo: savedTodo })
        })
        .catch(error => {
            return res.json({ error })
        })
}

const updateSingleTodo = (req, res) => {
    const { id } = req.params
    const updateTodoBody = req.body
    console.log(updateTodoBody)
    const existingTodo = Todo.findById({ _id: id })
    if (existingTodo) {
        // console.log(existingTodo)
        Todo.updateOne({ _id: id }, updateTodoBody, { new: true })
            .then((updatedTodo) => {
                console.log(updatedTodo)
                Todo.find({})
                    .then((todos) => {
                        return res.json({ todos })
                    })
                    .catch(error => {
                        return res.json({ error })
                    })
            })
            .catch(error => {
                return res.json({ error })
            })

    } else {
        console.log("todo to be updated not found.")
        return res.status(404).json({
            message: "The updated todo not found"
        })
    }
}

const deleteSingleTodo = (req, res) => {
    const { id } = req.params
    Todo.findOneAndDelete({ _id: id })
        .then(async deleted => {
            if(deleted) {
               res.status(200).json({
                message: "Todo deleted",
                deleted
               })
            } else {
                console.log("todo to be updated not found.")
                return res.status(404).json({
                    message: "Todo with the id not found"
                })
            }
        })
        .catch(error=>{
            return res.status(500).json({
                message: "server error"
            })
        })
}


app.get("/todos", getAllTodos)
app.get("/todos/:id", getSingleTodo)
app.post("/todos/create", createSingleTodo)
app.put("/todos/update/:id", updateSingleTodo)
app.delete("/todos/delete/:id", deleteSingleTodo)


const { PORT, MONGODBURL } = process.env;

mongoose.connect(MONGODBURL, { dbName: "todo" })
    .then((onSuccess) => {
        console.log("MongoDB is running")
    })
    .catch(error => {
        console.log("Error connecting to MongoDB", error)
    })

app.listen(PORT, () => {
    console.log("App is running on:", PORT)
})
