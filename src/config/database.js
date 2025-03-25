const mongoose = require("mongoose")

const connectDB = async () => {
    mongoose.connect("mongodb+srv://manya_nayak:password_made_by_manya@cluster0.vixqa.mongodb.net/devTinder")
}

module.exports = connectDB