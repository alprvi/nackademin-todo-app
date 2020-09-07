import { taskModel, validateTask } from "./tasks.model";
import { tasksListModel } from "./../tasksLists/tasksLists.model";

export const taskController = {
  async createTask(req, res) {
    const author = req.user._id;
    const { title, tasksList } = req.body;
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].context.label);
    const task = {
      title,
      tasksList,
      author,
    };
    const taskCreated = await taskModel.createTask(task);
    // Update tasksList by pushing to tasksList tasks array
    await tasksListModel.updateTasksList(tasksList, {
      $push: {
        tasks: tasksList,
      },
    });

    if (!taskCreated) return res.sendStatus(500);
    res.status(201).send(taskCreated);
  },

  async getTasks(req, res) {
    const tasks = await taskModel.getTasks({});
    if (!tasks) return res.sendStatus(404);
    res.status(200).send(tasks);
  },

  async getTask(req, res) {
    const task = await taskModel.getTask(req.params.id);
    if (!task) return res.status(404).send("task not found");
    res.status(200).send(task);
  },

  async updateTask(req, res) {
    const task = await taskModel.getTask(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    if (req.user._id !== task.author)
      return res.status(403).send("You are not allowed to do this");

    const updatedTask = await taskModel.updateTask(req.params.id, req.body);
    if (!updatedTask) return res.sendStatus(500);
    res.status(200).send(updatedTask);
  },

  async deleteTask(req, res) {
    const task = await taskModel.getTask(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    const deletedTask = await taskModel.deleteTask(req.params.id);
    if (!deletedTask) return res.sendStatus(500);
    res.status(200).send(deletedTask);
  },
};
