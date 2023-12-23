const {connectDB} = require('./db-config/mongo-db')
const express = require('express')
const userRouter = require('./routes/userRoute.js')
const registerUserRouter = require('./auth/registerUser.js')
const signUserRouter = require('./auth/signUser.js')
const authUser = require('./auth/authUser.js')
const cors = require('cors')

require('dotenv').config()



const db = connectDB()

const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())

app.listen(PORT, ()=>{
  console.log(`Listening on ${PORT} port`)
})

app.use('/register', registerUserRouter)
app.use('/signin', signUserRouter)
app.use("/tasks", userRouter)


