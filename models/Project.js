const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ProjectSchema = new Schema({
    name: {type: String, required: true}


},{
    timestamps : true
})



let ProjectModel = mongoose.model.Project|| mongoose.model("Project", ProjectSchema)

module.exports =  ProjectModel