const mongoose = require('mongoose');
const userSchema = require('../models/userSchema')
const taskSchema = require('../models/taskSchema')

const connectDB = async() => {
  // const dbUrl = "mongodb://0.0.0.0:27017/todos"
  const dbUrl = "mongodb+srv://todo:S1e24u5bQXY9kRKd@cluster0.8dll5rq.mongodb.net/?retryWrites=true&w=majority"
  let db = null
  try{
    // db = await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    db = await mongoose.connect(dbUrl)
    console.log("Connected to database")
    return db
  } catch(e){
    console.log("Can not connect to database: ", e)
  }
}

const User = mongoose.model('User', userSchema, 'users') // third parameter is name of collection


module.exports = {connectDB, User}