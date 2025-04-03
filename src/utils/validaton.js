const validator  = require ('validator')

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if(!firstName || !lastName) {
        throw new Error("Name is not valid.")
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Email is invalid.")
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Your password is weak!")
    }
}

const validateEditProfileData = (req) => {

    const allowedEditFields = [firstName, lastName, emailId, gender, age, photourl, about, skills]
    const isAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field))

    return isAllowed
}

module.exports = {
    validateSignUpData, validateEditProfileData,
}    