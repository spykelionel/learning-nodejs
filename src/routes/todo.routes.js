const todoRouter = require('express').Router()
const {
    getAllTodos,
    getSingleTodo,
    createSingleTodo,
    updateSingleTodo,
    deleteSingleTodo,
} = require('../controllers/todo.controller')
const { verifyUser } = require('../middleware/auth')

todoRouter.get("/", getAllTodos, )
todoRouter.get("/:id",verifyUser, getSingleTodo)
todoRouter.post("/create",verifyUser, createSingleTodo)
todoRouter.put("/update/:id", verifyUser, updateSingleTodo)
todoRouter.delete("/delete/:id",verifyUser, deleteSingleTodo)


module.exports = todoRouter;

