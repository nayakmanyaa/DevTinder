const express = require("express")
const { userAuth } = require("../middleware/auth");
const { ConnectionRequest } = require("../models/connectionRequest")
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", userAuth, async(req, res) => {

    try{
        const fromUserId = req.body._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)) {
            throw new Error("Invalid status type")
        }
        
        const toUser = await User.findOne(toUserId);
        if(!toUser) {
            return res.status(400).send("User not found")
        }

        // if there is an existing connectionRequest
        const alreadyExistingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ],
        })

        if(alreadyExistingRequest) {
            return res.status(400).send("Connection request already exist!")
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status,
        })

        const data = await connectionRequest.save();

        res.json({
            message: "Connection request send successfully!",
            data,
        })
    } catch(err) {
        res.status(400).send("ERROR: " +err.message)
    }
})

requestRouter.post("/request/review/accepted/:requestId", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user
        const { status, requestId } = req.params

        const isAllowed = ["accepted", "rejected"] 
        if(!isAllowed) {
            res.status(400).json({ message: "Invalid status request" })
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })

        if(!connectionRequest) {
            res.status(400).json({ message: "Connection Request not found" })
        }

        connectionRequest.status = status

        const data = await connectionRequest.save();

        res.json({ message: "Connection request" + status, data })
    } catch(err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = requestRouter