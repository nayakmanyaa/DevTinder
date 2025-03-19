const express = require("express")

const app = express();

app.use("/", (req, res) => {
    res.send("Hello!")
})

app.listen(7777, () => {
    console.log("Server is successfully listening at port 7777...")
});