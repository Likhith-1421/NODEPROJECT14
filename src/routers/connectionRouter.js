const { auth } = require("../middleware/auth");
const express = require("express")
const ConnectionModel = require("../model/ConnectionRequestSchema");
const connectionRouter = express.Router()
const User = require("../model/UserSchema")

connectionRouter.post("/sendRequest/:status/:toUserID", auth, async (req, res) => {
  try {
    const formUserID = req.result._id;
    const toUserID = req.params.toUserID;
    const status = req.params.status;

    const ConnectionRequest = new ConnectionModel({
      formUserID,
      toUserID,
      status
    })


    const touser = await User.findById(toUserID)
    if (!touser) {
      throw new Error("CAN'T FIND REQUESTING ACCOUNT")
    }

    if (formUserID.equals(toUserID)) {
      throw new Error("YOU CAN'T SEND CONNECTION TO YOURSELF");
    }


    const allowedStatus = ["INTRESTED", "IGNORED"]
    if (!allowedStatus.includes(status)) {
      throw new Error("CAN'T FIND STATUS")
    }

    const existingConnection = await ConnectionModel.findOne({
      $or: [{ formUserID, toUserID }, { formUserID: toUserID, toUserID: formUserID }]
    })
    if (existingConnection) {
      throw new Error("CONNECTION ALREADY EXISTS")
    }


    const connection = await ConnectionRequest.save()
    res.json({
      message: req.result.firstName + " is " + status + " for " + touser.firstName,
      // message : "connection sent successful",
      connection
    })
  }
  catch (err) {
    res.send("ERROR " + err.message)
  }
})

connectionRouter.post("/review/:status/:requestID", auth, async (req, res) => {
  try {
    const loginUser = req.result
    const { status, requestID } = req.params
    const allowedStatus = ["ACCEPTED", "REJECTED"]
    if (!allowedStatus.includes(status)) {
      throw new Error("INVALID ERROR")
    }
    const connectionRequest = await ConnectionModel.findOne({
      _id: requestID,
      toUserID: loginUser._id,
      status: "INTRESTED"
    })
    if (!connectionRequest) {
      throw new Error("Can't find data")
    }

    connectionRequest.status = status
    console.log(connectionRequest)
    const result = await connectionRequest.save()
    res.send(result)
  }
  catch (err) {
    res.status(400).send("ERRRO : " + err.message)
  }

})

connectionRouter.get("/User/pending/requests", auth, async (req, res) => {
  try {
   const dataString = ["firstName","lastName","age","gender","photourl","about"]
    const loginUser = req.result
    const connectionRequest = await ConnectionModel.find({
      toUserID: loginUser._id,
      status: "INTRESTED"
    }).populate("formUserID", dataString)
    res.send(connectionRequest)
  }
  catch (err) {
    res.status(400).send("ERROR : " + err.message)
  }
})

connectionRouter.get("/User/connections", auth, async (req, res) => {
  try {
    const dataString = ["firstName","lastName","age","gender","photourl"]
    const loginUser = req.result
    const connectionRequest = await ConnectionModel.find({
      $or: [{ toUserID: loginUser, status: "ACCEPTED" },
      { formUserID: loginUser, status: "ACCEPTED" }
      ]
    }).populate("formUserID", dataString).populate("toUserID", dataString)

    const data = connectionRequest.map((row) => {
      if (row.formUserID._id.toString() === loginUser._id.toString()) {
        return row.toUserID
      }
      return row.formUserID
    })
    res.json({ data })
  }

  catch (err) {
    res.send("ERROR : " + err.message)
  }


})

connectionRouter.get("/feed", auth, async (req, res) => {
  const loginUser = req.result
  const dataString = "firstName"
  const connectionRequest = await ConnectionModel.find({
    $or: [{ formUserID: loginUser },
    { toUserID: loginUser }
    ]
  }).populate("formUserID",dataString)

  const hideUserFromFeed = new Set()
  connectionRequest.forEach((req) =>
  {hideUserFromFeed.add(req.formUserID), hideUserFromFeed.add(req.toUserID)})
  console.log(hideUserFromFeed)
  const user = await User.find( {$and : [{_id : {$nin : Array.from(hideUserFromFeed)}},{_id:{$ne:loginUser._id}}]
    
  })

  res.send(user)
})



module.exports = connectionRouter

