const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
require('dotenv').config()

const { JWT_SECRET } = process.env
const authenticateUser = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email })
        .then(foundUser => {
            // 
            const storedPassword = foundUser.password
            bcrypt.compare(password, storedPassword, (error, same) => {
                if (error) {
                    return res.status(401).json({
                        message: "You can't login. Invalid credentials"
                    })
                }
                if (same) {
                    // create a jwt here
                    const token = jwt.sign(
                        {
                            ...foundUser
                        }, JWT_SECRET, { expiresIn: '1d' })
                    return res.status(201).json(
                        {
                            user: {
                                email: foundUser.email,
                                user_id: foundUser._id,
                            },
                            accessToken: token
                        }
                    )

                }
            })


        })

}

const verifyUser = async (req, res, next) => {
    // console.log(req.headers)
    try {
        const authorizedToken = await req.headers['authorization'].split(' ')[1]
        req.user = jwt.verify(authorizedToken, JWT_SECRET)

        next()
    } catch (error) {
        return res.status(400).json({
            message: "Verification error"
        })
    }
}


module.exports = {
    authenticateUser,
    verifyUser
}