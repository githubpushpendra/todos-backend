const {User} = require('../db-config/mongo-db')
const express = require('express')
const router = express.Router();

router.post("/", async(req, res)=>{
  const newUser = new User(req.body)
  if(newUser === null) res.send("Please enter user details")
  try {
    const savedUser = await newUser.save()
    res.send("User registered successfully")
  } catch(err) {
    if(err.code === 11000) {
      res.send("This email is already registered")
    } else {
      console.log(err)
      res.send("We are encountering some problem in registering you, Please message on 6387018533 with details")
    }
  }
  
})


module.exports = router



