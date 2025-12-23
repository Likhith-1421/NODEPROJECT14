const express = require('express')

const database = require("./config/database")
const User = require("./model/UserSchema")

const app = express()


app.use(express.json())
app.post("/signup",async(req,res)=>{
    const user = User(req.body);
    console.log(user)
    
          await user.save()
          res.send("CHECK DATA IN DATA BASE")
    
   
});


app.get("/findall",async(req,res)=>{
    try{
       const result = await User.find({})
       res.send(result)
    }
    catch(err)
    {
        res.status(404).send("DATA NOT FOUND")
   
    }
});

app.get("/find",async(req,res)=>{
   const user =  req.body.firstName
  const result = await User.find({firstName:user})
  try{
       res.send(result)
  }
  catch(err)
  {
      res.status(404).send("DATA NOT FOUND")
  }
})

app.get("/findone",async(req,res)=>{
   const user = req.body.firstName
   const result = await User.findOne({firstName:user})
   try{
         res.send(result)
   }
   catch(err)
   {
        res.status(404).send("DATA NOT FOUND")
   }
})

app.get("/delete",async(req,res)=>{
   const user =  req.body.lastName
   const result = await User.deleteOne({lastName:user})
   try{
      res.send(result)
   }
   catch(err)
   {
      res.status(404).send("WE ARE SORRY")
   }
})
app.get("/id",async(req,res)=>{
      const usre = req.body._id
    const result = await  User.findById({_id:usre})
    res.send(result)
});
app.patch("/updatebyfiled",async(req,res)=>{
  const user =  req.body.firstName
 const update =  req.body
 try{   
    const result = await User.findOneAndUpdate({firstName:user},update,{returnDocument:"after"})
    res.send("DATA UPDATED")
   }
 
 
 catch(err)
 {
     res.status(404).send("DATA NOT UPDATED")
 }
})

app.patch("/updatebyid",async(req,res)=>{
   const user = req.body._id
  const update = req.body
  try{
     await  User.findByIdAndUpdate({_id:user},update,{  runValidators : true})
   
     res.send("DATA UPTADED")
  }
  catch(err)
  {
     res.status(404).send("DATA NOT FOUND" + err.message)
  }

})



database()
.then(()=>{
    console.log("DATA BASE CONNECTED SUCCESFULLY")
    app.listen(8888,()=>{console.log("connected to port 8888")})
});












// app.use("/home",(req,res)=>{
//     res.send("HELLO SERVER HEllo")
// })
// app.use("/text",(req,res)=>{
//     res.send("HELLO SERVER LIKHITH")
// })
