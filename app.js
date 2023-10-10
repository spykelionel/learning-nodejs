const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const todoRouter = express.Router()

const allTodos = async (req, res) => {
    await Todo.find({})
    .then(todos => {
        return res.status(200).json({
            todos
        })
    })
    .catch(error=>console.log(error))
}

const createTodo = async (req, res) => {
    // Check if todotext exist, then send a 409 - for a dublicate,
    // Todo.findOne({text: req.body.text}) || If todo, return 409, else 
    // return 409.
    const newTodo = new Todo({text: req.body.text})
    await newTodo.save()
        .then(todo => {
            // if(todo) {
            //     /// return 409
            // } else {
            //     // create a todo
            // }
            return res.status(201).json({
                todo
            })
        })
        .catch(error=>console.log(error))
}

todoRouter.get('/', allTodos)
.post("/create", createTodo)
// .delete("/delete/:todoId", deleteTodo)

// Add delete todo Todo to the router chain above.

// http://localhost:8000/todos/create


app.use(express.json())
app.use(express.urlencoded({ extended: true, }))
app.use("/todos", todoRouter)


let users = [
    {
        id: 0,
        name: "A",
        gender: "x"
    },
    {
        id: 1,
        name: "B",
        gender: "x"
    },
    {
        id: 2,
        name: "C",
        gender: "x"
    }
]


const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isComplete: {
        type: String,
        required: false,
        default: false
    },
    description: {
        type: String,
        required: true,
        default: "A todo"
    }
}, { timestamps: true })

const Todo = mongoose.model("Todo", todoSchema)


mongoose.connect(process.env.MONGODBURL, { dbName: "first-app" })
.then(success => {
    console.log("Mongodb is now running")
})
.catch(error => {
    console.log("Error connecting to DB: ", error)
})


// app.get("/todos", allTodos)

// app.post("/todos/create", createTodo)

app.delete("/todos/delete/:todoId", async (req, res) => {
    const {todoId} = req.params
    await Todo.findOneAndDelete({_id: todoId})
        .then(todo => {
            return res.status(201).json({
                todo
            })
        })
        .catch(error=>console.log(error))
})

// -> Ge a single todo....

app.get("/", (req, res) => {
    res.json({
        message: "API is running now",
        by: "Lionel"
    })
})

app.post("/", (req, res) => {
    const body = req.body

    res.json({
        message: "API is running now",
        body
    })
    console.log("Posting here")
})


app.get("/users", (req, res) => {
    return res.json({
        message: "All users",
        users
    })
})

app.get("/users/:username", (req, res) => {
    const { username } = req.params

    const user = users.find(u => u.name === username)

    if (user) {
        return res.status(200).json({
            message: `Found User with ${username}`,
            statusCode: 200
        })
    }

    return res.status(404).json({
        message: `No user with ${username}`,
        statusCode: 404
    })

})

app.put("/users/:username", (req, res) => {
    const { username } = req.params
    const { name } = req.body

    const user = users.find(u => u.name === username)

    if (user) {

        // modify
        let currentUser = user
        users = users.filter(u => u.name != username)

        currentUser.name = name
        users = [...users, currentUser]
        return res.status(201).json({
            message: `Found User with ${username}`,
            statusCode: 200,
            users
        })
    }

    return res.status(404).json({
        message: `No user with ${username}`,
        statusCode: 404
    })

})

app.post("/users/create", (req, res) => {
    const { name, gender } = req.body

    const user = users.find(u => u.name === name)
    if (user) {
        return res.status(409).json({
            messag: "Duplicate",
            statusCode: 409
        })
    }

    const newUser = { id: Date.now().toString(), name, gender }

    users = [...users, newUser]
    // users.push(newUser)

    res.status(201).json({
        message: "User has been created",
        statusCode: 201,
        newUser
    })

})

app.listen(8000, '127.0.0.1', (err) => {
    if (err) {
        console.log("Error at", err)
        throw new Error(err);
    }
    console.log("App is running")
})



/*


todo = {
    id: ...,
    text: ....,
    isComplete: ...,
    description: ....,
    date_created: ...,
    date_updated: ...,
}


*/