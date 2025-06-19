const express = require("express")
const { userAuth } = require("../middleware/auth")
const { ConnectionRequest } = require("../models/connectionRequest")
const User = require("../models/user")

const userRouter = express.Router()

// get all the pending request for the loggedIn user
userRouter.get("/user/requests/recieved", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequest.findOne({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", "firstname lastname age gender about skills")
        // }).populate("fromUserId", ["firstname", "lastname"])

        res.json({
            message: "Data fectched successfully",
            data: connectionRequest
        })
    } catch(err) {
        res.status(400).send("ERROR: "+  err.message)
    }
})

const USER_SAFE_DATA = ["firstname lastname age gender about skills"]

userRouter.get("/user/requests/recieved", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user

        const connectionRequest = await connectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)

        const data = await connectionRequest.map((row) => {
            if(row.toUserId.toString() === loggedInUser._id.toString()) {
                return fromUserId
            }
            return toUserId
        })
        res.json({ data })
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

userRouter.get("/feed", userAuth, async(req, res) => {
    try {

        // user should see all the user card except
        // his own card
        // his/her's connecton
        // ignored people
        // already send the connection request

        const loggedInUser = req.user

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50? 50 : limit;
        const skip = (page-1)*limit;

        // find all the connection requests(send + recieved)
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUserFromFeed = new Set()
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        });

        const users = await UserActivation.find({
            $and: [
                { _id: {$nin: Array.from(hideUserFromFeed)} }, { _id: {$ne: loggedInUser._id} }
            ]
        }).select(USER_SAFE_DATA)

        res.send(users)

    } catch (err) {
        res.status(400).json({message: err.message}).skip(skip).limit(limit)
    }
})

module.exports = userRouter