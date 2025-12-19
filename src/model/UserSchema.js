const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName :{
        type :String
    },
    age :{
        type : Number
    },
    emailID:
    {
        type : String
    },
    phoneNumber:{
        type : Number
    },
}) 

const User = mongoose.model("user",UserSchema)
module.exports = User