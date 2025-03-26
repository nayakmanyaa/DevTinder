const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        trim: true, // will trim white spaces
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["female", "male", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        }
    },
    photourl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
    },
    about: {
        type: String,
        default: "This is a default about of user"
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);