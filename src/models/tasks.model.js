const mongoose = require("mongoose");
const Joi = require("joi");
const pick = require("lodash.pick");

const schema = {
  title: {
    type: String,
    trim: true,
    required: [true, "Please enter a title"],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
  tasksList: {
    type: String,
    required: true,
  },
};

const taskSchema = new mongoose.Schema(schema, { timestamps: true });

taskSchema.methods.toJSON = function () {
  let taskObject = this.toObject();
  return pick(taskObject, [
    "_id",
    "title",
    "isDone",
    "isUrgent",
    "author",
    "tasksList",
  ]);
};

const Task = mongoose.model("task", taskSchema);

function validateTask(data) {
  const schema = Joi.object().keys({
    title: Joi.string().required().label("You must provide a title"),
    tasksList: Joi.string().required().label("You must provide a tasksList"),
  });
  return schema.validate(data);
}

const taskModel = {
  async createTask(task) {
    try {
      return await Task.create(task);
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getTasks(filter) {
    try {
      return Task.find(filter);
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getTask(id) {
    try {
      return await Task.findOne({ _id: id });
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async updateTask(id, body) {
    try {
      return await Task.findByIdAndUpdate(id, body, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async deleteTask(id) {
    try {
      return await Task.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = { Task, taskModel, validateTask };
