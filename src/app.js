console.log("🔥 BACKEND WITH PATCH CORS IS RUNNING 🔥");


const express = require('express');
const database = require("./config/database")
const cookieParser = require("cookie-parser")
const authRouter = require("./routers/authRouter")
const profileRouter = require("./routers/profileRouter")
const connectionRouter = require("./routers/connectionRouter")
const cors = require("cors")

const app = express()

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.options("*", cors());
app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
}))
app.use(express.json())
app.use(cookieParser())

// app.use((req, res, next) => {
//   console.log("HIT 👉", req.method, req.url);
//   next();
// });

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/",connectionRouter)

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
      const ALLOWED_UPDATES = ["_id", "firstName", "lastName", "phoneNumber", "age", "skills"]
      const is_updated = Object.keys(update).every((k) => ALLOWED_UPDATES.includes(k));

      if (!is_updated) {
         throw new Error("FILED CAN'T BE UPDATED")
      };
      //  if(update.skills.length > 10)
      // {
      //    throw new Error("skills must be lessthan 10")
      // }
      await User.findByIdAndUpdate({ _id: user }, update, { runValidators: true });
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
