const express = require('express')

const app = express()


app.use("/home/3",(req,res)=>{
    res.send("HELLO SERVER 3")
})
// app.use("/home",(req,res)=>{
//     res.send("HELLO SERVER HEllo")
// })
// app.use("/text",(req,res)=>{
//     res.send("HELLO SERVER LIKHITH")
// })

app.post("/user/:userID/:password",(req,res)=>{
    console.log(req.params)
    res.send({"firstname":"LIKHITH", "secondname":"puttabakula"})
})

app.listen(7777,()=>{
    console.log('CONNECTED TO SERVER !')
})
app.listen(8888,()=>{
    console.log('CONNECTED TO SERVER !')
})
app.use("/",(req,res)=>{
    res.send("hello /")
})