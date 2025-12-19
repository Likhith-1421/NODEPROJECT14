const mongoose = require("mongoose")

const database= async()=>
    {mongoose.connect("mongodb+srv://likhithpbk_db_user:NODEPROJECTMAIN@nodeprojectmain.nzmjghj.mongodb.net/")}
module.exports = database