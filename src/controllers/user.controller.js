const User = require('../model/User')
const bcrypt = require('bcrypt')

// getSingleUser
// deleteSingleUser
// updateSingle

const createUser = (req, res) => {
    const {email, password} = req.body

    // hash password
    // SALT=10

    const SALT = 10
    bcrypt.hash(password, SALT)
        .then(hashedPassword=>{
            const user = new User({email, password: hashedPassword})
            user.save()
            .then(savedUser=>{
                return res.status(201).json({
                    user: savedUser
                })
            })
            .catch(error=>{
                return res.status(500).json({
                    message: "Could not create user account"
                })
            })
        })
        .catch(error=>{
            return res.status(500).json({
                message: "Could not create user account"
            })
        })
    return 
}

const getSingleUser = (req, res) => {
    const {id} = req.params

    User.findById({_id: id})
        .then(foundUser=>{
            return res.status(200).json({
                user: foundUser
            })
        })
        .catch(error=>{
            return res.status(500).json({
                message: "Could not create user account"
            })
        })
}

const getAllUsers  = (req, res) => {
    User.find({})
        .then((users) => {
            return res.json({ users })
        })
        .catch(error => {
            return res.json({ error })
        })
}


module.exports = {
    createUser,
    getSingleUser,
    getAllUsers
}