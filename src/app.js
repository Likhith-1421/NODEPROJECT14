const express = require('express');
const database = require("./config/database")
const User = require("./model/UserSchema")
const validateUpdate = require("./utlies/Validators")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {auth} = require("./middleware/auth")
const app = express()


app.use(express.json())
app.use(cookieParser())
app.post("/signup", async (req, res) => {
   try{
   
   
   validateUpdate(req)    //data validattion

   const {firstName,lastName,emailID,password} = req.body
   const passwordhash = await bcrypt.hash(password , 10)   //password bcrypting(securing our password with hash)

const user = User({
   firstName,
   lastName,
   emailID,
   password : passwordhash
});
   console.log(user)
 await user.save()
   res.send("LOGIN SUCCESSFUL")
}
catch(err)
{
    res.status(404).send("ERROR : " + err.message)
}
  
});

app.post("/login",async(req,res)=>{
  try{
 const {emailID,password} = req.body
   const find = await User.findOne({emailID})
   if(!find)
   {
       throw new Error("INVALID EMAIL")
   }
 const password_correct = await bcrypt.compare(password,find.password) 


 if(password_correct){

   const token = jwt.sign({idname : find.emailID},"Likhith@1421")
   res.cookie("token",token)
   res.send("LOGIN SUCCESSFULLYyyyyy")
 }
 else
 {
     throw new Error("INCORRECT PASSWORD")
 }
  }
   catch (err) {
     res.status(404).send("UPDATE FAILED :" + err.message)
   }
  
})



app.get("/profile",auth,async(req,res)=>{
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




app.get("/findall", async (req, res) => {
   try {
      const result = await User.find({})
      res.send(result)
   }
   catch (err) {
      res.status(404).send("DATA NOT FOUND")

   }
});

app.get("/find", async (req, res) => {
   const user = req.body.firstName
   const result = await User.find({ firstName: user })
   try {
      res.send(result)
   }
   catch (err) {
      res.status(404).send("DATA NOT FOUND")
   }
})

app.get("/findone", async (req, res) => {
   const user = req.body.firstName
   const result = await User.findOne({ firstName: user })
   try {
      res.send(result)
   }
   catch (err) {
      res.status(404).send("DATA NOT FOUND")
   }
})

app.get("/delete", async (req, res) => {
   const user = req.body.lastName
   const result = await User.deleteOne({ lastName: user })
   try {
      res.send(result)
   }
   catch (err) {
      res.status(404).send("WE ARE SORRY")
   }
})
app.get("/id", async (req, res) => {
   const usre = req.body._id
   const result = await User.findById({ _id: usre })
   res.send(result)
});
app.patch("/updatebyfiled", async (req, res) => {
   const user = req.body.firstName
   const update = req.body
   try {
      const result = await User.findOneAndUpdate({ firstName: user }, update, { returnDocument: "after" })
      res.send("DATA UPDATED")
   }


   catch (err) {
      res.status(404).send("DATA NOT UPDATED")
   }
})

app.patch("/updatebyid", async (req, res) => {
   const user = req.body._id
   const update = req.body
   try {
      const ALLOWED_UPDATES = ["_id","firstName", "lastName", "phoneNumber", "age", "skills"]
      const is_updated = Object.keys(update).every((k) => ALLOWED_UPDATES.includes(k));

       if (!is_updated) {
         throw new Error("FILED CAN'T BE UPDATED")
      };
      //  if(update.skills.length > 10)
      // {
      //    throw new Error("skills must be lessthan 10")
      // }
       await User.findByIdAndUpdate({ _id : user }, update, { runValidators: true });
            res.send("DATA UPTADED")
   }
   catch (err) {
     res.status(404).send("UPDATE FAILED :" + err.message)
   }

})



database()
   .then(() => {
      console.log("DATA BASE CONNECTED SUCCESFULLY")
      app.listen(8888, () => { console.log("connected to port 8888") })
   });












// app.use("/home",(req,res)=>{
//     res.send("HELLO SERVER HEllo")
// })
// app.use("/text",(req,res)=>{
//     res.send("HELLO SERVER LIKHITH")
// })
