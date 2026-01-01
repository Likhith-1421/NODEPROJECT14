const mongoose = require("mongoose")
const database = async () => {
   await mongoose.connect("mongodb+srv://likhithpbk_db_user:NODEPROJECTMAIN@nodeprojectmain.nzmjghj.mongodb.net/")
}
module.exports = database;