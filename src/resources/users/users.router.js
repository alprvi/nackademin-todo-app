import express from "express";

import { userController } from "./users.controller";
import { authorization, admin } from "../../middlewares";
export const userRouter = express.Router();

userRouter.route("/").get(userController.getUsers);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(authorization, admin, userController.deleteUser);

userRouter.route("/:id/tasks").get(userController.getUserTasks);
