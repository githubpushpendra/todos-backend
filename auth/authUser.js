const {User} = require('../db-config/mongo-db')
const mongoose = require('mongoose')

const authUser = async(user, callback)=> {

  if (mongoose.connection.readyState !== 1) {
    console.error('MongoDB connection is not open');
    return;
  }

  const result = await User.findOne({email: user.email})
  
  if(result == null) {
    callback("user does not exist", null)
  } else {
    if(user.password !== result.password) {
      callback("Invalid Password")
    } else {
      callback(null, "User Authenticated")
    }
  }
  
}


module.exports = authUser