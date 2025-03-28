const express = require("express")
const profileRouter = express.Router();

const { userAuth } = require("../middleware/auth");

// get profile
profileRouter.get("/profile", userAuth, async(req, res) => {
    try{
        const user = req.user
        res.send(user);
    } catch(err) {
        res.status(404).send("ERROR: " +err.message)
    }  
})

module.exports = profileRouter