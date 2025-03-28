const express = require("express")
const connectDB = require("./config/database")
const app = express();
const user = require("./models/user");


app.use(express.json())

const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)

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


 