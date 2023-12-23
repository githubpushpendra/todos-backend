const mongoose = require('mongoose')
const taskSchema = require('./taskSchema')

const User = mongoose.Schema({

  email: {
    type: String, required: true, unique: true
  }, // setting email unique will create indexes by email

  password: {
    type: String, required: true
  },

  tasks: [taskSchema]

})

module.exports = User