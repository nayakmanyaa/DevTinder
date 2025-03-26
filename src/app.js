const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {
    // creating a new instance of user model
    const user = new User(req.body)  

    try {
        await user.save();
        res.send("User added successfully")
    } catch (err) {
        res.send(400).send("Error saving the user" + err.message);
    }  
})

// get user by email
app.get("/user", async(req, res) => {
    try {
        const users = User.find({ emailId: userEmail });
        if(user.length === 0) {
            res.status(400).send("User Not Found!")
        } else {
            res.send(users)
        }
    } catch(err) {
        res.status(400).send("Something went wrong!")
    }
})

// feed API - GET /feed - get all the users from the database
app.get("/feed", async(req, res) => {
    try{
        const users = await User.find({})
        res.send(users);
    } catch(err) {
        res.status(400).send("Something went wrong!")
    }
})

// delete a user API
app.delete("/user", async(req, res) => {
    const userId = req.body.userId
    try {
        await User.findByIdAndDelete({ _id: userId })
        // const user = await User.findByIdAndDelete({ userId })
        res.send("User deleted successfully")
    } catch(err) {
        res.status(400).send("Something went wrong!")
    }
})   

// updating a user data
app.patch("/user/:userId", async(req,res) => {
    const userId = req.body.userId
    // const userId = req.body._id
    const data = req.body
    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"]
        const isAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k) )
        if(!isAllowed) {
            throw new Error("Update not allowed")
        }
        if(data?.skills.length>10) {
            throw new Error("Skills cannot be more than 10")
        }
        await User.findByIdAndUpdate({ _id: userId }, data, {returnDocument: "after", runValidators: true,})
        // await User.findByIdAndUpdate(userId, data)
        res.send("User updated successfully!")
    } catch(err) {
        res.status(400).send("Something went wrong!")
    }
})

connectDB() 
.then(() => {
    console.log("Database connection established...")
    app.listen(7777, () => {
        console.log("Server is successfully listening at port 7777...")
    });   
}) 
.catch((err) => { 
    console.error("Database cannot be connected!!")
})


 