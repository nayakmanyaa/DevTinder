const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();
const { validateSignUpData } = require("./utils/validaton")
const bcrypt = require("bcrypt");
const user = require("./models/user");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");


app.use(express.json())

app.post("/signup", async (req, res) => {

    try {
        // validation of data 
        validateSignUpData(req)

        const { firstName, lastName, emailId, password } = req.body

        // encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)

        // creating a new instance of user model
        // const user = new User(req.body) // not a good code
        const user = new User({
            firstName,
            lastName,
            emailId, 
            password: passwordHash
        })

        await user.save();
        res.send("User added successfully")
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }  
})  

app.post("/login", async (req, res) => {
    try{
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId: emailId })
        if(!user) {
            throw new Error("Invalid credentials")
        } 
        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid) {
            // create JWT token
            const token = await user.getJWT();

            // add the token to cookies and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 8*3600000)})
            res.send("Login successful")
            
        } else {
            throw new Error("Invalid credentials")
        }
    } catch (err) {
        res.status(404).send("ERROR: " + err.message)
    }
})

// get profile
app.get("/profile", userAuth, async(req, res) => {
    try{
        const user = req.user
        res.send(user);
    } catch(err) {
        res.status(404).send("ERROR: " +err.message)
    }  
})

app.post("/sendConnectionRequest", userAuth, async(req, res) => {
    console.log("Sending a connection request")
    res.send(user.firstName + "sent connection request")
})
 
// get user by email
// app.get("/user", async(req, res) => {
//     const userEmail = req.body.emailId
//     try {
//         const users = await User.findOne({ emailId: userEmail });
//         if(user.length === 0) {
//             res.status(404).send("User Not Found!")
//         } else {
//             res.send(users)
//         }
//     } catch(err) {
//         res.status(400).send("Something went wrong!")
//     }
// })

// feed API - GET /feed - get all the users from the database
// app.get("/feed", async(req, res) => {
//     try{
//         const users = await User.find({})
//         res.send(users);
//     } catch(err) {
//         res.status(400).send("Something went wrong!")
//     }
// })

// delete a user API
// app.delete("/user", async(req, res) => {
//     const userId = req.body.userId
//     try {
//         await User.findByIdAndDelete({ _id: userId })
//         // const user = await User.findByIdAndDelete({ userId })
//         res.send("User deleted successfully")
//     } catch(err) {
//         res.status(400).send("Something went wrong!")
//     }
// })   

// updating a user data
// app.patch("/user/:userId", async(req,res) => {
//     const userId = req.params.userId;
//     // const userId = req.body._id
//     const data = req.body
//     try {
//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"]
//         const isAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k) )
//         if(!isAllowed) {
//             throw new Error("Update not allowed")
//         }
//         if(data?.skills.length>10) {
//             throw new Error("Skills cannot be more than 10")
//         }
//         await User.findByIdAndUpdate({ _id: userId }, data, {returnDocument: "after", runValidators: true,})
//         // await User.findByIdAndUpdate(userId, data)
//         res.send("User updated successfully!")
//     } catch(err) {
//         res.status(400).send("Something went wrong!")
//     }
// })  

// const PORT = process.env.PORT || 8080;

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


 