const mongoose = require("mongoose")
const validate = require("validator")
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

const User = mongoose.model("user", UserSchema)
module.exports = User