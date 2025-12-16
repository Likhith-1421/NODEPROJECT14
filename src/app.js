const express = require('express')

const app = express()


// app.use("/home/3",(req,res)=>{
//     res.send("HELLO SERVER 3")
// })
app.use("/testing",(req,res,next)=>{
    console.log("route 1")
    next()
},
(req,res,next)=>{
 console.log('route 2')
 next()
},
(req,res,next)=>{
   res.send("HELLO EVERY ONE!!")    
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
