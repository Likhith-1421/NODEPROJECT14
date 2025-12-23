const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true

    },
    lastName :{
        type :String
    },
    age :{
        type : Number
    },
    emailID:
    {
        type : String,
        required : true,
        unique : true,
    },
    phoneNumber:{
        type : Number,
        min : 15
    },
    gender :{
        type : String,
    validate(value){
        if(!["male","female","others"].includes(value))
        {
            throw new Error("invalid gender");
            
        }
    }
    }
},{
    timestamps : true
}) 

const User = mongoose.model("user",UserSchema)
module.exports = User