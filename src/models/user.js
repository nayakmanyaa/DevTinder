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
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address" + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validate.isStrongPassword(value)) {
                throw new Error("Enter a strong passwrod:" + value)
            }
        }
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
        validate(value) {
            if(!validate.isUrl(value)) {
                throw new Error("Url of photo is not valid!")
            }
        }
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