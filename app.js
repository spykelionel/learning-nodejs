const { json } = require('body-parser')
const http = require('http')
const { hostname } = require('os')

const server = http.createServer((request, response)=>{
   console.log(request.url)
   console.log(request.method)
   const html = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
   </head>
   <body>
       <h1>This is the response</h1>
       
   </body>
   </html>
   `

   const person = {
    name: "Chun",
    age: "23",
    gender: "F"
   }
   const _response = {
    method: request.method,
    url: request.url
   }

   response.setHeader("Content-Type", "application/json")
   response.end(JSON.stringify(person))
   
})

server.listen(5000, "127.0.0.1", ()=>console.log("server is running at http://localhost:5000"))