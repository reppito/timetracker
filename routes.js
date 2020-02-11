const userController = require('./controller/UserController')
const TaskController = require('./controller/TaskController')
const ProjectController = require('./controller/ProjectController')
// const passportconfig = require ('./config/passport')
const middleware = require('./middleware/middleware')
module.exports = (app) => {


  // User routes
  app.post("/user/create", userController.SaveUser)
  app.get("/user/getuser/:email", userController.GetUsers)


  //taskRoutes
  app.post("/task/create", middleware.verifyUser, TaskController.CreateTask)
  app.delete("/task/delete", middleware.verifyUser, TaskController.DeleteTask)
  app.post("/task/play", middleware.verifyUser, TaskController.Play)
  app.post("/task/pause", middleware.verifyUser, TaskController.Pause)
  app.post("/task/restart", middleware.verifyUser, TaskController.Restart)
  app.get("/task/gettasks/:userid", middleware.verifyUser, TaskController.GetTasksByUser)
  app.post("/task/addtoproject", middleware.verifyProject, TaskController.AddTaskToProject)
  app.post("/task/deleteproject", TaskController.DeleteTaskFromProject)
  //ProjectRoutes
  app.post("/project/create", ProjectController.CreateProject)
  app.delete("/project/delete", middleware.verifyProject, ProjectController.DeleteProject)
  app.get("/project/projecttime/:projectid", middleware.verifyProject, ProjectController.TimeProject)
  app.get("/project/listProjects", ProjectController.listOFProjects)

}