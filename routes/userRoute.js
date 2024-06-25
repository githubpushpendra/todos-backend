const express = require('express')
const router = express.Router()
const registerUserRoute = require('../auth/registerUser')
const {User} = require('../db-config/mongo-db')
const signIn = require('../auth/signUser')
const authToken = require('../auth/authToken')
const {addTask, getTasks, updateTask, deleteTask} = require('../service/userTaskService')

router.get("/", (req, res)=>{
  const authorization = req.headers.authorization
  if(authorization === undefined) res.send("Kindly provide token or signin")
  const token = authorization.split(' ')[1]
  // console.log("Headers is:", req.headers)
  // console.log("Token is: ", token)
  authToken(token, (err, user)=>{
    if(err) res.send(err)
    else {
      getTasks(user.email, (err, {email: email, tasks: tasks})=>{
        if(err) {
          res.send("Could not fetch tasks")
        } else {
          res.status(200).send({email: email, tasks: tasks})
        }
      })
    }
  })
})

router.post("/", (req, res)=>{
  // console.log("POST req received")
  if(req.headers.authorization === undefined) res.send("Kindly provide token or signin")
  const token = req.headers.authorization.split(' ')[1]
  // console.log("Token Received")
  authToken(token, (err, user)=>{
    if(err) res.send(err)
    else {
      const task = req.body
      // console.log("Auth done & Task is: ", task)
      addTask(user.email, task, (err, result)=>{
        if(err) res.send(err)
        else {
          res.status(201).send(result)
        }
      })
    }
  })
})

router.put("/", async(req, res)=>{
  if(req.headers.authorization === undefined) res.send("Kindly provide token or signin")
  const token = req.headers.authorization.split(' ')[1]
  authToken(token, (err, user)=>{
    if(err) res.send(err)
    updateTask(user.email, req.body, (err, result)=>{
      if(err) res.send(err)
      else res.status(200).send(result)
    })
  })
})

router.delete("/", async(req, res)=>{
  // console.log("Delete req received")
  if(req.headers.authorization === undefined) res.send("Kindly provide token or signin")
  const token = req.headers.authorization.split(' ')[1]
  // console.log("Token is parsed")
  authToken(token, (err, user)=>{
    if(err) res.send(err)
    deleteTask(user.email, req.body, (err, result)=>{
      if(err) res.send(err)
      else res.status(204).send(result)
    })
  })
})

module.exports = router