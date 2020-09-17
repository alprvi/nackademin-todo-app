const express = require("express");
const router = express.Router();

const taskRouter = require("./tasks.router");
const tasksListRouter = require("./tasksLists.router");
const userRouter = require("./users.router");
const policiesRouter = require("./policies.router");

const { authorization } = require("../middlewares");
const userController = require("../controllers/users.controller");

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
router.use("/policies", policiesRouter);

module.exports = router;
