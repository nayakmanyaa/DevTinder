const express = require("express")
const connectDB = require("./config/database")
const app = express();
const user = require("./models/user");
const cookieParser = require("cookie-parser");


app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

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


 