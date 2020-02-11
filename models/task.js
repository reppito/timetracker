const mongoose = require("mongoose")
const Schema = mongoose.Schema

let TaskSchema = new Schema({
    name: String,
    timeTracked: Number,
    playDate: Number,
    description: String,
    project: mongoose.Schema.Types.ObjectId,
    user: {required: true, type: mongoose.Schema.Types.ObjectId},
    paused: {type: Boolean, default: true}

},{
    timestamps : true
})




let TaskModel =  mongoose.model.Task || mongoose.model("task", TaskSchema)

module.exports =  TaskModel