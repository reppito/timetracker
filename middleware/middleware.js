const User = require('../models/User')
const Project = require('../models/Project')

exports.verifyUser = async (req, res, next) => {
    let userid = req.body.userid || req.params.userid
    var ExistUSer = await User.findById(userid, (err, user) => user)

    if (ExistUSer) {
        next()
    } else {
        res.status(404).send({ messange: "user not found" })
    }


}
exports.verifyProject = async (req, res, next) => {
    let projectid =  req.body.projectid || req.params.projectid
    console.log(projectid)
    let ExistProject = await Project.findOne({ _id: projectid }, (err, project) => project)
    console.log(ExistProject)
    if (ExistProject) {
        next()
    } else {
        res.status(404).send({ messange: "project not found" })
    }

}

