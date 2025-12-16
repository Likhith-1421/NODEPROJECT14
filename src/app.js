const express = require('express')

const app = express()

const {admin} = require("./middleware/auth")
app.use("/auth", admin)

// app.get("/auth/corret",(req,res)=>
// {
//     res.send("HELLO LIKHITH")
// })
app.use("/error",(req,res)=>{
   throw new error("hufuydvcvb");
   
})

app.use("/",(err,req,res,next)=>
{
  if(err)
    {
        res.status(500).send("Something went wrong!!")
    }
})

app.listen(8888,()=>{
    console.log('CONNECTED TO SERVER !')
})











// app.use("/home",(req,res)=>{
//     res.send("HELLO SERVER HEllo")
// })
// app.use("/text",(req,res)=>{
//     res.send("HELLO SERVER LIKHITH")
// })
