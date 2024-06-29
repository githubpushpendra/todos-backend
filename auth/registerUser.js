const {User} = require('../db-config/mongo-db')
const express = require('express')
const verifyUser = require('./userVerification')
const {encryptPass, matchPass} = require('../service/encryption')
const router = express.Router();

router.post("/", async(req, res)=>{
  const newUser = new User(req.body)
  UVR = verifyUser(newUser)
  // console.log("registering User!")
  if(UVR !== true) res.status(404).send(UVR)
  else {
    try {
      const encyptedUser = new User(
        {
          email: newUser.email,
          password: await encryptPass(newUser.password)
        }
      ) 
      const savedUser = await encyptedUser.save()
      res.send("User registered successfully") 
    } catch(err) {
      if(err.code === 11000) {
        res.status(404).send("This email is already registered")
      } else {
        console.log(err)
        res.status(404).send("We are encountering some problem in registering you, Please message on 6387018533 with details")
      }
    }
  }
  
})


module.exports = router



