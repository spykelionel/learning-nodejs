const express = require("express");
const { createServer, request } = require("http");

const app = express();

// http://localhost:5000/
app.get("/", (request, response)=>{
// handle every request at /
    response.status(201).send({
        name: "Lin",
        age: 34
    })
})

// http://localhost:5000/users
app.get("/users", (request, response)=>{
    // handle every request at /users
    response.send("This is the users endpoint")
})

app.listen(5000, () => {
  console.log("App is running on port 5000");
});

