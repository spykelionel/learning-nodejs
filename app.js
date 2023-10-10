const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true, }))


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

mongoose.connect(process.env.MONGODBURL, { dbName: "first-app" })
    .then(success => {
        console.log("Mongodb is now running")
    })
    .catch(error => {
        console.log("Error connecting to DB: ", error)
    })

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
        users = users.filter(u=>u.name!=username)

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


*/