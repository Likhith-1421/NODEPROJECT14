const validate = require("validator")
const validateUpdate = (req) => {
    const { firstName, lastName, emailID, password } = req.body

    if (!firstName || !lastName) {
        throw new Error("PLEASE ENTER YOUR NAMES");
    }
    else if (!validate.isEmail(emailID)) {
        throw new Error("PLEASE ENTER VALID EMAILID");
    }
    else if (!validate.isStrongPassword(password)) {
        throw new Error("PLEASE ENTER A STRONG PASSWORD")
    }
}

const validateprofileeditdata = (req) => {



    const allowedfields = ["firstName", "lastName",  "age", "phoneNumber", "gender","photourl","about"]
  
 
    const isallowed = Object.keys(req.body).every((fields) => allowedfields.includes(fields))
    
   const gender = ["male","female","others"]

   if(req.body.gender && !gender.includes(req.body.gender))
{
    throw new Error("invalid gender")
}
    return isallowed




}


module.exports =
{
    validateUpdate,
    validateprofileeditdata
}