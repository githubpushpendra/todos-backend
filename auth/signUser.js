const User = require('../db-config/mongo-db')
const jwt = require('jsonwebtoken')
const express = require('express')
const authUser = require('./authUser')
const router = express.Router()
require('dotenv').config()

router.post('/', async(req, res) =>{
  const secretKey = process.env.JWT_SIGN_KEY
  const user = req.body
  // console.log("Inside Signin")
  await authUser(user, (err, result)=>{
    if(err) res.send(err)
  })

  jwt.sign(user, secretKey, (err, token)=>{
    if(err){
      res.send("Could not sign in retry")
    } else {
      // res.setHeader("Authorization", `Bearer ${token}`)
      // res.setHeader({"Authorization": `Bearer ${token}`})
      // console.log(token)
      const resBody = {
        message: "Successfully signed in",
        Authorization: `Bearer ${token}`
      }
      res.send(resBody)
    }
  })
})

module.exports = router