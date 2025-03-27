const validator  = require ('validator')

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, passwrod } = req.body;
    if(!firstName || !lastName) {
        throw new Error("Name is not valid.")
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Email is invalid.")
    } else if(!validator.isStrongPassword(passwrod)) {
        throw new Error("Your password is weak!")
    }
}

module.exports = {
    validateSignUpData, 
}    