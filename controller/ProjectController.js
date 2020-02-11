const Project = require('../models/Project')
const Task = require('../models/task')


exports.CreateProject = async (req, res) => {

    let project = new Project({
        name: req.body.name
    })

    project.save((err,proj) => {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.send({ message: "stored",
                        id: proj._id
                    })
        }
    })




}

exports.DeleteProject = async (req, res) => {


    let result = await Project.deleteOne({ _id: req.body.projectid })

    //update all the task with that projectid to avoid errors
    Task.updateMany({ project: req.body.projectid }, { $unset: { project: 1 } }, (err) => console.status(500).log(err))
    res.send({ message: "succesfully!" })

}

exports.TimeProject = async (req, res) => {


    let project = await Project.findOne({ _id: req.params.projectid}, (err, project) => project)
    Task.find({ project: req.params.projectid },
        (err, result) => {

            let cont = 0
            var run = 0
            for (let i = 0; i < Object.keys(result).length; i++) {
                
                if(result[i].playDate)
                    run = Math.round(Date.now()/1000) - result[i].playDate
                else
                    run = 0
                cont += (result[i].timeTracked + run)
                }
            res.send({ 
                project: project.name,
                projectid: project._id,
                timeSpent: cont 
            })
        })

}

exports.listOFProjects = (req,res) =>{

    Task.aggregate([
        // First Stage
        {
          $group :
            {
              _id: { project:"$project"},
              tasks: { $push:{task: "$_id", user: "$user", time: "$timeTracked"}},
              total: { $sum: "$timeTracked" }
            }
         }
       ]).exec((err,response) =>{
            if (err){
                res.status(500).send({message: "oh oh something happen!"})
            } else {
                res.send(response)
            }})
}

