const express = require("express");

const userController = require("../controllers/users.controller");
const { authorization, admin } = require("../middlewares");
const userRouter = express.Router();

userRouter.route("/").get(userController.getUsers);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(authorization, admin, userController.deleteUser);

userRouter.route("/:id/tasks").get(userController.getUserTasks);

module.exports = userRouter;
