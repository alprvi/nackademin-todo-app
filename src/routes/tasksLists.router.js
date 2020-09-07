import express from "express";

import { tasksListController } from "../controllers/tasksLists.controller";
import { authorization, admin } from "../middlewares";
// import { catchErrors } from "../../middlewares"; // Remove try and catch blocks in tasks.router and use middleware instead
export const tasksListRouter = express.Router();

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
