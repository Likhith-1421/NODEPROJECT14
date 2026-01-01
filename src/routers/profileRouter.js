const express = require("express")
const {auth} = require("../middleware/auth")
const profileRouter = express.Router()

profileRouter.get("/profile",auth,async(req,res)=>{
   try{

const result = req.result
console.log(result)
res.send(result)
   }
   catch(err)
   {
        res.status(404).send("UPDATE FAILED :" + err.message)
   }
  
})
module.exports= profileRouter 