import mongoose from "mongoose";
import Joi from "joi";
import pick from "lodash.pick";

const schema = {
  title: {
    type: String,
    trim: true,
    required: [true, "Please enter a title"],
  },
  author: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array,
  },
};

const tasksListSchema = new mongoose.Schema(schema, { timestamps: true });

tasksListSchema.methods.toJSON = function () {
  let tasksListObject = this.toObject();
  return pick(tasksListObject, ["_id", "title", "author", "tasks"]);
};

export const TasksList = mongoose.model("tasksList", tasksListSchema);

export function validateTasksList(data) {
  const schema = Joi.object().keys({
    title: Joi.string().required().label("You must provide a title"),
  });
  return schema.validate(data);
}

export const tasksListModel = {
  async getTasksLists() {
    try {
      return TasksList.find();
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getTasksList(id) {
    try {
      return await TasksList.findOne({ _id: id });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async createTasksList(tasksList) {
    try {
      return await TasksList.create(tasksList);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async updateTasksList(id, body) {
    try {
      return await TasksList.findByIdAndUpdate(id, body, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async deleteTasksList(id) {
    try {
      return await TasksList.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
