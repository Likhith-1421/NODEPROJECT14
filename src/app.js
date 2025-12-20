const express = require('express')
const database = require("./config/database")
const User = require("./model/UserSchema")
const app = express()

app.use(express.json())
app.post("/signup", async(req,res)=>{

  

    const user = User(req.body)

    try{
    await user.save()
    res.send("register completed ")
    }
    catch(err)
    {
        res.status(400).send("something went wrong")
    }


   
})


database()
.then(()=>{
    console.log("DATA BASE CONNECTED SUCCESFULLY")
    app.listen(8888,()=>{console.log("connected to port 8888")})
})

// const {admin} = require("./middleware/auth")
// app.use("/auth", admin)

// // app.get("/auth/corret",(req,res)=>
// // {
// //     res.send("HELLO LIKHITH")
// // })
// app.use("/error",(req,res)=>{
//    throw new error("hufuydvcvb");
   
// })

// app.use("/",(err,req,res,next)=>
// {
//   if(err)
//     {
//         res.status(500).send("Something went wrong!!")
//     }
// })

// app.listen(8888,()=>{
//     console.log('CONNECTED TO SERVER !')
// })











// app.use("/home",(req,res)=>{
//     res.send("HELLO SERVER HEllo")
// })
// app.use("/text",(req,res)=>{
//     res.send("HELLO SERVER LIKHITH")
// })
