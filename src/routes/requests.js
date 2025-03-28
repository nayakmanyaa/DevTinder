const express = require("express")
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async(req, res) => {
    console.log("Sending a connection request")
    res.send(user.firstName + "sent connection request")
})

module.exports = requestRouter