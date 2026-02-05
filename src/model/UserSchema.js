const mongoose = require("mongoose")
const validate = require("validator")
const jwt = require("jsonwebtoken")
const UserSchema = new mongoose.Schema({
    firstName: {

        type: String,
        required: true,

    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    emailID:
    {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validate.isEmail(value)) {
                throw new Error("INVALID Email")
            }
        }
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        min: 15
    },
    photourl :{
        type : String
    },
  
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("invalid gender");

            }
        }
    },
      about : {
        type : String
    },
    skills: {
        type: Array
    }
}, {
    timestamps: true
})

UserSchema.methods.getJWT = async function ()
{
    const find = this
       const token = jwt.sign({ idname: find.emailID }, "Likhith@1421")
       return token
}

const User = mongoose.model("user", UserSchema)
module.exports = User