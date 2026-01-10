const {auth} = require("../middleware/auth");
const express = require("express")
const ConnectionModel = require("../model/ConnectionRequestSchema");
const connectionRouter = express.Router()
const User = require("../model/UserSchema")

connectionRouter.post("/connectionRequest/:status/:toUserID",auth,async(req,res)=>{
    try{
          const formUserID = req.result._id;
          const  toUserID  = req.params.toUserID;
          const status = req.params.status;

          const ConnectionRequest = new ConnectionModel({
               formUserID,
               toUserID,
               status
          })


        const  touser =await User.findById(toUserID)
        if(!touser){
            throw new Error("CAN'T FIND REQUESTING ACCOUNT")
        }
          

        
      const allowedStatus = ["INTRESTED","IGNORED"]
      if(!allowedStatus.includes(status))
      {
        throw new Error("CAN'T FIND STATUS")
      }

     const existingConnection = await ConnectionModel.findOne({
        $or:[{formUserID,toUserID},{formUserID : toUserID, toUserID:formUserID}]
     })
     if(existingConnection){
        throw new Error ("CONNECTION ALREADY EXISTS")
     }


     const connection = await ConnectionRequest.save()
    res.json({
        message: req.result.firstName +"is" + status + "for" + touser.firstName,
        // message : "connection sent successful",
        connection
    })
    }
    catch(err)
    {
        res.send("ERROR " + err.message)
    }
})
module.exports = connectionRouter

