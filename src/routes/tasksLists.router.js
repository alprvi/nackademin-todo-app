const express = require("express");

const tasksListController = require("../controllers/tasksLists.controller");
const { authorization, admin } = require("../middlewares");
// const { catchErrors } = require("../../middlewares"); // Remove try and catch blocks in tasks.router and use middleware instead
const tasksListRouter = express.Router();

tasksListRouter
  .route("/")
  // .get(catchErrors(tasksListController.getTasksList))
  .get(tasksListController.getTasksLists)
  .post(authorization, tasksListController.createTasksList);

tasksListRouter
  .route("/:id")
  .get(tasksListController.getTasksList)
  .put(authorization, tasksListController.updateTasksList)
  .delete(authorization, admin, tasksListController.deleteTasksList);

tasksListRouter.route("/:id/tasks").get(tasksListController.getTasksListTasks);

module.exports = tasksListRouter;
