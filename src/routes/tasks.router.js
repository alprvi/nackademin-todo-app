import express from "express";

import { taskController } from "../controllers/tasks.controller";
import { authorization, admin } from "../middlewares";
// import { catchErrors } from "../../middlewares"; // Remove try and catch blocks in tasks.router and use middleware instead
export const taskRouter = express.Router();

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
