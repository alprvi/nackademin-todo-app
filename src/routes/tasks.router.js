const express = require("express");

const taskController = require("../controllers/tasks.controller");
const { authorization, admin } = require("../middlewares");
// const { catchErrors } = require("../../middlewares"); // Remove try and catch blocks in tasks.router and use middleware instead
const taskRouter = express.Router();

taskRouter
  .route("/")
  // .get(catchErrors(taskController.gettasks))
  .get(authorization, taskController.getTasks)
  .post(authorization, taskController.createTask);

taskRouter
  .route("/:id")
  .get(authorization, taskController.getTask)
  .put(authorization, taskController.updateTask)
  .delete(authorization, admin, taskController.deleteTask);

module.exports = taskRouter;
