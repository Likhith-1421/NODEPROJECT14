const mongoose = require("mongoose")

const connectionSchema = new mongoose.Schema({
    formUserID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    toUserID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    status:{
        type : String,
        enum : {
            values : ["INTRESTED","IGNORED","ACCEPTED","REJECTED"]
        }
    }
}) 

// connectionSchema.pre("save",function(next){
//     const ConnectionModel= this
//   if(ConnectionModel.formUserID.equals(ConnectionModel.toUserID))
//   {
//     throw new Error("CAN'T SEND REQUEST TO YOURSELF")
//   }
//     next()
// })

// connectionSchema.pre("save", function () {
//     if (!this.formUserID || !this.toUserID) {
//         throw new Error("User IDs are required");
//     }

//     if (this.formUserID.equals(this.toUserID)) {
//         throw new Error("YOU CAN'T SEND CONNECTION TO YOURSELF");
//     }
// });



const ConnectionModel = new mongoose.model("ConnectionModel",connectionSchema)
module.exports = ConnectionModel