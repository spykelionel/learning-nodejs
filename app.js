const http = require('http')

const port = 5000
const hostname = '127.0.0.1'

const server = http.createServer((request, respond)=>{
    respond.statusCode = 200
    respond.setHeader("Content-Type", 'text/plain')
    respond.end("Hello world!")
})

server.listen(port, hostname, ()=>{
    console.log(`Server is runnit at http://${hostname}:${port}`)
})