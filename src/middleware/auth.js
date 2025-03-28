const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    try{
        const cookie = req.cookie
        const { token } = cookie
        if(!token) {
            throw new Error("token is not valid")
        }
        const decodeObj = await jwt.verify(token, "ManyaNayak")
        const { _id } = decodeObj
        const user = await User.findOne(_id);
        if(!user) {
            throw new Error("User Not Found!")
        }
        next();
    } catch(err) {
        res.status(400).send("ERROR: " +err.message)
    }
}

module.exports = {
    userAuth,
}