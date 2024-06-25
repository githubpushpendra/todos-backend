const mongoose = require("mongoose")
const {User} = require("../db-config/mongo-db")


const IsDuplicate = (user, task)=>{
  return user.tasks.some((oneTask)=> oneTask.name === task.name)
}

const addTask = async(email, task, callbackFunction)=>{
  try{
    const user = await User.findOne({email: email})
    if(user === undefined || user === null) callbackFunction("User does not exits")
    if(IsDuplicate(user, task)) callbackFunction("This task already exists", null)
    else {
      user.tasks.push(task)
      user.save()
      callbackFunction(null, `Task is added to ${user.email}`)
    }
  } catch(err){
    console.log(err)
    callbackFunction(err, null)
  }
}

const getTasks = async(email, callbackFunction)=>{
  try {
    const user = await User.findOne({email: email})
    // console.log(user)
    const tasks = user.tasks
    if(tasks === undefined || tasks === null) callbackFunction(null, "No task is available !")
    else callbackFunction(null, {email: user.email, tasks: tasks})
  } catch(err) {
    console.log(err)
    callbackFunction(err, null)
  }
}

const updateTask = async(email, newTask, callback)=>{
  const user = await User.findOne({email:email})
  let i = 0
  for( ; i<user.tasks.length; i++){
    if(user.tasks[i].name === newTask.name) {
      user.tasks[i].done = newTask.done
      await user.save()
      callback(null, `Status of ${user.email}'s task ${newTask.name} is updated to done: ${user.tasks[i].done}`)
      break
    }
  }
  if(i === user.tasks.length) callback("Task does not exist")
}

const deleteTask = async(email, task, callback)=>{
  // console.log("delete initiated")
  const user = await User.findOne({email: email})
  let index = user.tasks.findIndex((currTask)=>{
    return currTask.name === task.name
  })
  // console.log(task,"Task found", user.tasks[index], index)
  if(index === -1) callback("Task does not exist", null)
  else {
    user.tasks.splice(index, 1)
    user.save()
    callback(null, "Task deleted successfully")
  }
}

module.exports = {addTask, getTasks, updateTask, deleteTask}