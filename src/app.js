const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const todoRouter = require('./routes/todo.routes');
const userRouter = require('./routes/user.routes');

dotenv.config();
const app = express();


app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/todos', todoRouter)
app.use('/users', userRouter)
// app.use('/users', userros)

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
