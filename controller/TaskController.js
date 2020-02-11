const Task = require("../models/task")
const User = require('../models/User')
const Project = require("../models/Project")
const TimeFunctions = require('../Functions/time')

exports.CreateTask = async (req, res) => {


  if(req.body.projectid){
    let ExistProject = await Project.find({ _id: req.body.projectid }, (err, project) => project)

    if (ExistProject){
      let time = (req.body.time) ? TimeFunctions.CalculateTime(req.body.time) : 0

      let task = new Task({
        name: req.body.name,
        timeTracked: time,
        description: req.body.description,
        project: req.body.projectid,
        user: req.body.userid
      })
    
      task.save((err, task) => {
        if (err)
          res.send({ message: err.message })
        else
          res.send({ message: "stored" ,
                      id: task._id})
    
      })
    
    } else {
        res.send({messange:"project not found"})
    }
  } else {

    let time = (req.body.time) ? TimeFunctions.CalculateTime(req.body.time) : 0

    let task = new Task({
      name: req.body.name,
      timeTracked: time,
      description: req.body.description,
      user: req.body.userid
    })
  
    task.save((err,task) => {
      if (err)
        res.send({ message: err.message })
      else
        res.send({ message: "stored",
                   id:    task._id         
        })
  
    })
  }




}


exports.DeleteTask = async (req, res) => {

  let ExistTask = await Task.findOne({_id:req.body.taskid, user:req.body.userid}, (err, task) => task)
  if (ExistTask) {
    let err = await Task.deleteOne({ _id: req.body.taskid, user: req.body.userid })
    res.send({message: "succesfully!"})
  }
  else {
    res.send({ messange: "Task not found" })
  }
}

exports.Play =async  (req, res) => {


  let ExistTask = await Task.findOne({_id:req.body.taskid, user:req.body.userid}, (err, task) => task)
  console.log(ExistTask.paused)
  if (ExistTask) {

    if (ExistTask.paused == true){
      ExistTask.paused = false
      ExistTask.playDate = parseInt(req.body.timestamp)
      ExistTask.save((err) => {
        if (err)
          res.send({message: err.message})
        else 
          res.send({message: "timer started"})
      })
     
    }
    else{
      res.send({message: "timer was already started"})
    }

  }
  else {
    res.send({ messange: "Task not found" })
  }


}

exports.Pause = async  (req, res) => {


  let ExistTask = await Task.findOne({_id:req.body.taskid, user:req.body.userid}, (err, task) => task)
  if (ExistTask) {
    if (ExistTask.paused == false){
      ExistTask.paused = true
      ExistTask.timeTracked += (parseInt(req.body.timestamp) - ExistTask.playDate)
      ExistTask.playDate = null
      ExistTask.save((err) => {
        if (err)
          res.send({message: err.message})
        else 
          res.send({message: "timer paused"})
      })
     
    }
    else{
      res.send({message: "timer was already paused"})
    }

  }
  else {
    res.send({ messange: "Task not found" })
  }

}


exports.Restart = async  (req, res) => {


  let ExistTask = await Task.findOne({_id:req.body.taskid, user:req.body.userid}, (err, task) => task)
  if (ExistTask) {
    
      ExistTask.paused = true
      ExistTask.timeTracked = 0
      ExistTask.playDate = null
      ExistTask.save((err) => {
        if (err)
          res.send({message: err.message})
        else 
          res.send({message: "timer restarted"})
      })
     
   

  }
  else {
    res.send({ messange: "Task not found" })
  }

}

exports.GetTasksByUser = (req, res) => {
  
  Task.find({user: req.params.userid}).sort({createdAt: -1}).exec(function(err,tasks){
    res.send(tasks)
  })
}

exports.AddTaskToProject = async (req,res) => {
  let ExistTask = await Task.findById({_id:req.body.taskid, user:req.body.user}, (err, task) => task)
   if(ExistTask){
      ExistTask.project = req.body.projectid
      ExistTask.save((err) => {
        if(err){
          res.send({message: "oh oh something happen!"})
        } else {
          res.send({message: "update!"})
        }
      })

   }

}

exports.DeleteTaskFromProject = async (req,res) => {
  Task.updateOne({ _id: req.body.taskid  }, { $unset: { project: 1 } }, 
                  (err) => {
                    if (err){
                      res.send({message: "task not found"})
                    } else {
                      res.send({message: "task updated"})
                    }

                  })

  }

