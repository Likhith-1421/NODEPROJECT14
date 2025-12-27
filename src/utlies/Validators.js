const validate = require("validator")
const validateUpdate = (req) =>{
    const {firstName,lastName,emailID,password} = req.body

    if(!firstName || !lastName)
    {
        throw new Error("PLEASE ENTER YOUR NAMES");
    }
    else if (!validate.isEmail(emailID)){
        throw new Error("PLEASE ENTER VALID EMAILID");
    }
    else if(!validate.isStrongPassword(password)){
        throw new Error("PLEASE ENTER A STRONG PASSWORD")
    }
} 
module.exports = validateUpdate