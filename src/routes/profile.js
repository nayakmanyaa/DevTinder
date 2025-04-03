const express = require("express")
const profileRouter = express.Router();

const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validaton")

// get profile
profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        const user = req.user
        res.send(user);
    } catch(err) {
        res.status(404).send("ERROR: " +err.message)
    }  
})

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try {
        if(!validateEditProfileData) {
            throw new Error("Invalid update request")
        }
        const loggedInuser = req.user; 
        Object.keys(req.body).forEach((key) => (loggedInuser[key]=req.body[key]))
        await loggedInuser.save();
        res.send(`${loggedInuser.firstName}, your profile updated successfully`)
        res.send({ 
            message: `${loggedInuser.firstName}, your profile updated successfully`, 
            data: loggedInuser
        })
    } catch (err) {
        res.status(400).send("ERROR: "+err.message)
    }
})

// wrong api
// profileRouter.patch("/profile/password", userAuth, async(req,res) => {
//     try {
//         const loggedInuserForPassword = req.user;
//         const realPassword = loggedInuserForPassword.password;
//         // if the user wants to update password
//         const correct = await bcrypt.compare(realPassword, )
//     } catch (err) {
//         res.status(400).send("ERROR: "+err.message)
//     }
// })

module.exports = profileRouter