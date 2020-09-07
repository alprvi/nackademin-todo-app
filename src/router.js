import express from "express";
export const router = express.Router();

import { taskRouter } from "./resources/tasks/";
import { tasksListRouter } from "./resources/tasksLists/";
import { userRouter, userController } from "./resources/users/";
import { authorization } from "./middlewares";

router.get("/", (req, res) => {
  res.send("Home page");
});
router.get("/about", (req, res) => {
  res.send("About page");
});

router.get("/login", (req, res) => res.send("Sign In"));
router.post("/login", userController.login);

router.get("/register", (req, res) => res.send("Sign Up"));
router.post("/register", userController.createUser);

router.get("/me", authorization, userController.getDashboard);

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/taskslists", tasksListRouter);
