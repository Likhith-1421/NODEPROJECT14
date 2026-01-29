const express = require("express")
const { auth } = require("../middleware/auth")
const profileRouter = express.Router()
const { validateprofileeditdata } = require("../utlies/Validators")

profileRouter.get("/profile/view", auth, async (req, res) => {
   try {

      const result = req.result
      console.log(result)
      res.send(result)
   }
   catch (err) {
      res.status(404).send("UPDATE FAILED :" + err.message)
   }

})

profileRouter.post("/profile/edit", auth, (req, res) => {
   try {
      if (!validateprofileeditdata(req)) {
         throw new Error("DATA CAN'T BE UPDATED")

      }
   
  
      const login = req.result;
   
      Object.keys(req.body).forEach((fields) => (login[fields] = req.body[fields]))
     

      login.save()
     res.send(login)
   }

   catch (err) {
      res.status(400).send("ERROR : " + err.message)
   }
})
module.exports = profileRouter 