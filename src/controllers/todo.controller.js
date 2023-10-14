const Todo = require('../model/Todo')

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
    console.log(req.user)
    const todo = new Todo({ text, user: req.user._doc._id })
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

module.exports = {
    createSingleTodo,
    deleteSingleTodo,
    getAllTodos,
    getSingleTodo,
    updateSingleTodo
}