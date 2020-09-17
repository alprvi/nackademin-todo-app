const pick = require("lodash.pick");
const bcrypt = require("bcryptjs");

const { User, userModel, validateUser } = require("../models/users.model");
const { taskModel } = require("../models/tasks.model");

const userController = {
  async login(req, res) {
    const result = await userModel.login(req.body.email, req.body.password);
    if (!result.loggedIn) res.status(403).send(result.message);
    console.log(result);
    //  return user and token
    res.status(200).send(result.token);
  },

  async createUser(req, res) {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].context.label);
    }
    // Check if user already exists HERE
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    let userSaved = await userModel.createUser(user);
    if (!userSaved) return res.sendStatus(500);
    const token = userSaved.generateAuthToken();
    res.header("x-access-token", token).status(201).send(userSaved);
  },

  async getUsers(req, res) {
    const users = await userModel.getUsers();
    if (!users) return res.sendStatus(404);
    res.status(200).send(users);
  },

  async getUser(req, res) {
    const user = await userModel.getUser(req.params.id);
    if (!user) return res.status(404).send("user not found");
    res.status(200).send(user);
  },

  async getUserTasks(req, res) {
    const user = await userModel.getUser(req.params.id);
    if (!user) return res.status(404).send("User not found");
    const tasks = await taskModel.getTasks({ author: user._id });
    if (!tasks.length) {
      res.status(200).send("No tasks created by this user");
    } else {
      res.status(200).send(tasks);
    }
  },

  async updateUser(req, res) {
    const user = await userModel.getUser(req.params.id);
    if (!user) return res.status(404).send("user not found");
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.sendStatus(500);
    res.status(200).send(updatedUser);
  },

  async deleteUser(req, res) {
    const user = await userModel.getUser(req.params.id);
    if (!user) return res.status(404).send("user not found");

    const deletedUser = await userModel.deleteUser(req.params.id);
    if (!deletedUser) return res.sendStatus(500);
    res.status(200).send(deletedUser);
  },

  async getDashboard(req, res) {
    try {
      const user = await User.findById(req.user._id);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = userController;
