const fs = require('fs')


fs.stat("file.txt", (err, stat)=>{
    if(err){
        // console.log(err)
        throw new Error(err)
    }


    // stat
    console.log("Size:", stat.size, "B")
    console.log("Is a fIle:", stat.isFile())
    console.log("Is a dir:", stat.isDirectory())
})