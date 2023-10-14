const userRouter = require('express').Router()
const {
    getAllUsers,
    getSingleUser,
    createUser
} = require('../controllers/user.controller')
const { authenticateUser } = require('../middleware/auth')

userRouter.get("/", getAllUsers)
userRouter.get("/:id", getSingleUser)
userRouter.post("/create", createUser)
userRouter.post("/auth/login", authenticateUser)


module.exports = userRouter;

