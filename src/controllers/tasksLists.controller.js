const {
  tasksListModel,
  validateTasksList,
} = require("../models/tasksLists.model");
const { taskModel } = require("../models/tasks.model");

const tasksListController = {
  async createTasksList(req, res) {
    const author = req.user._id;
    const { title } = req.body;
    const { error } = validateTasksList(req.body);
    if (error) return res.status(400).send(error.details[0].context.label);
    let tasksList = {
      title,
      author,
    };
    let tasksListCreated = await tasksListModel.createTasksList(tasksList);
    if (!tasksListCreated) return res.sendStatus(500);
    res.status(201).send(tasksListCreated);
  },

  async getTasksLists(req, res) {
    const tasksLists = await tasksListModel.getTasksLists();
    if (!tasksLists) return res.sendStatus(404);
    res.status(200).send(tasksLists);
  },

  async getTasksListUser(req, res) {
    const tasksListUser = await tasksListModel.getTasksList({});
    if (!tasksListUser) return res.sendStatus(404);
    res.status(200).send(tasksListUser);
  },

  async getTasksList(req, res) {
    const tasksList = await tasksListModel.getTasksList(req.params.id);
    if (!tasksList) return res.status(404).send("tasksList not found");
    res.status(200).send(tasksList);
  },

  async getTasksListTasks(req, res) {
    const tasksList = await tasksListModel.getTasksList(req.params.id);
    if (!tasksList) return res.status(404).send("tasksList not found");
    const tasks = await taskModel.getTasks({ tasksList: tasksList._id });
    res.status(200).send(tasks);
  },

  async updateTasksList(req, res) {
    const tasksList = await tasksListModel.getTasksList(req.params.id);
    if (!tasksList) return res.status(404).send("TasksList not found");
    if (req.user._id !== tasksList.author)
      return res.status(403).send("You are not allowed to do this");

    const updatedTasksList = await tasksListModel.updateTasksList(
      req.params.id,
      req.body
    );
    if (!updatedTasksList) return res.sendStatus(500);
    res.status(200).send(updatedTasksList);
  },

  async deleteTasksList(req, res) {
    const tasksList = await tasksListModel.getTasksList(req.params.id);
    if (!tasksList) return res.status(404).send("TasksList not found");
    const deletedTasksList = await tasksListModel.deleteTasksList(
      req.params.id
    );
    if (!deletedTasksList) return res.sendStatus(500);
    res.status(200).send(deletedTasksList);
  },
};

module.exports = tasksListController;
