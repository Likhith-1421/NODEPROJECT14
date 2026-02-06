const express = require("express")
const {validateUpdate} = require("../utlies/Validators")
const authRouter = express.Router()
const User = require("../model/UserSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

authRouter.post("/signup", async (req, res) => {
  try {


    validateUpdate(req)    //data validattion

    const { firstName, lastName, emailID, password } = req.body
    const passwordhash = await bcrypt.hash(password, 10)   //password bcrypting(securing our password with hash)

    const user = User({
      firstName,
      lastName,
      emailID,
      password: passwordhash
    });
    console.log(user)
   const savedData  = await user.save()

  //  const token = await savedData.getJWT()
  //     res.cookie("token", token)
  
  const token = await jwt.sign({ idname: savedData.emailID }, "Likhith@1421")
  res.cookie("token", token)

  
    res.send("LOGIN SUCCESSFUL")
  }
  catch (err) {
    res.status(404).send("ERROR :" + err.message)
  }

});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body
    const find = await User.findOne({ emailID: emailID })
    if (!find) {
      throw new Error("INVALID EMAIL")
    }
    const password_correct = await bcrypt.compare(password, find.password)


    if (password_correct) {

   const token = await find.getJWT()
      res.cookie("token", token)
      res.send(find)
    }
    else {
      throw new Error("INCORRECT PASSWORD")
    }
  }
  catch (err) {
    res.status(404).send( err.message)
  }

})

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expaires: new Date(Date.now)

  })
  res.send("Logout successfuly")
})

module.exports = authRouter