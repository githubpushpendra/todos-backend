const jwt = require('jsonwebtoken')
require('dotenv').config()
const authUser = require("./authUser")

const authToken = async(token, callback)=>{

  try {
    const user = jwt.verify(token, process.env.JWT_SIGN_KEY)
    authUser(user, (err, result)=>{
      callback(err, user)
    })
  } catch(err) {
    callback("Invalid Signature", null)
  }

}

module.exports = authToken