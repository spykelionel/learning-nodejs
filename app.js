const path = require('path')

const _path = "C:\\Users\\Null\\Desktop\\MERN\\Nodejs\\app.js"

console.log("Parent: ", path.dirname(_path))
console.log("Base: " , path.basename(_path))
console.log("File extension:", path.extname(_path))