require("dotenv").config();
const chai = require("chai");

const { dbDisconnect, dbConnect } = require("../src/config/database");
const tasksModel = require("../src/models/tasks.model");
const tasksListsModel = require("../src/models/tasksLists.model");
const userModel = require("../src/models/users.model");

chai.should();

describe("TASK MODEL", function () {
  before(async function () {
    await dbConnect();
  });

  beforeEach(async function () {
    await tasksModel.Task.deleteMany();
    await tasksListsModel.TasksList.deleteMany();
    await userModel.User.deleteMany();
  });

  after(async function () {
    await dbDisconnect();
  });
  describe("POST /tasks", function () {
    it("should create a task", async function () {
      // Arrange
      const task = {
        title: "test_task",
        author: "test_author",
        tasksList: "test_tasksListId_09823409823409234098234",
      };

      // Act
      const result = await tasksModel.taskModel.createTask(task);

      // Assert
      result.should.be.an("object");
      result.should.have.property("_id");
      result.should.have.property("tasksList");
      result.should.have.property("title");
      result.should.have.property("author");
      result.should.have.property("createdAt");
      result.should.have.property("updatedAt");
      result.should.have.property("isUrgent");
      result.should.have.property("isDone");
    });
  });

  describe("GET /tasks/:id", function () {
    it("should return a task by id", function () {
      // Arrange
      // Act
      // Assert
    });
  });
  describe("PUT /tasks/:id", function () {
    it("should update a task", function () {
      // Arrange
      // Act
      // Assert
    });
  });
  // describe("DELETE /tasks/:id", function () {
  //   it("should delete a task", function () {
  //     // Arrange
  //     // Act
  //     // Assert
  //   });
  // });
});
