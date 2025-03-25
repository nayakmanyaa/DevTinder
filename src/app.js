const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "navnidhi",
        lastName: "idk",
        emailId: "ajey@gmail.com",
        password: "123456",
    })  

    try {
        await user.save();
        res.send("User added successfully")
    } catch (err) {
        res.send(400).send("Error saving the user" + err.message);
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

 