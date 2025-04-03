const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        // index: true,
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
            if(!validator.isStrongPassword(value)) {
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
        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is not a valid gender types`,
        }
        // validate(value) {
        //     if(!["female", "male", "others"].includes(value)) {
        //         throw new Error("Gender data is not valid")
        //     }
        // }
    },
    photourl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            if(!validator.isURL(value)) {
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

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id:emailId}, "ManyaNayak", { expiresIn: "7d" });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    // const isPasswordValid = await bcrypt.compare("password", this.password)
    return isPasswordValid
}

module.exports = mongoose.model("User", userSchema);