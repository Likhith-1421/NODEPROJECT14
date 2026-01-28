const jwt = require("jsonwebtoken")
const User = require("../model/UserSchema")
const auth = async (req, res, next) => {
   try {

  
      const { token } = req.cookies
      if (!token) {
         throw new Error("Please Login")
      }
      const decodedmessage = await jwt.verify(token, "Likhith@1421")
      const { idname } = decodedmessage
      //    console.log(idname)
      const result = await User.findOne({ emailID: idname })
      console.log(result)
      if (!result) {
         throw new Error("USER NOT FOUND")
      }
      req.result = result
      next()
   }
   catch (err) {
      res.status(401).send("ERROR " + err.message)
   }

}

module.exports = { auth }

