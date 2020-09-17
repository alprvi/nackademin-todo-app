const path = require("path");

const { User, userModel, validateUser } = require("../models/users.model");
const { taskModel } = require("../models/tasks.model");
const { tasksListModel } = require("../models/tasksLists.model");

const gdprController = {
  async getCookiePolicy(req, res) {
    res.sendFile(path.resolve(__dirname + "/../public/cookie-policy.txt"));
  },
  async getPrivacyPolicy(req, res) {
    res.sendFile(path.resolve(__dirname + "/../public/privacy-policy.txt"));
  },

  async getUserInfo(req, res) {
    const user = await userModel.getUser(req.user._id);
    const tasks = await taskModel.getTasks({ author: user._id });
    const tasksLists = await tasksListModel.getTasksListUser({
      author: user._id,
    });

    res.status(200).json({ user, tasks, tasksLists });
  },

  async deleteUserInfo(req, res) {
    const user = await userModel.deleteUser(req.user._id);
    const tasks = await taskModel.deleteTasks({ author: user._id });
    const tasksLists = await tasksListModel.deleteTasksListUser({
      author: user._id,
    });

    res.status(200).json({ user, tasks, tasksLists });
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

  async deleteUser(req, res) {
    const user = await userModel.getUser(req.params.id);
    if (!user) return res.status(404).send("user not found");

    const deletedUser = await userModel.deleteUser(req.params.id);
    if (!deletedUser) return res.sendStatus(500);
    res.status(200).send(deletedUser);
  },
};

module.exports = gdprController;
