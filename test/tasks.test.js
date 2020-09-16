import chai from "chai";

import { taskModel } from "../src/models/tasks.model";

chai.should();

describe("TASK MODEL", function () {
  describe("POST /tasks", function () {
    it("should create a task", async function () {
      // Arrange
      const task = {
        title: "test_task",
        author: "test_author",
        tasksList: "test_tasksList",
      };

      // Act
      const result = await taskModel.createTask(task);

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
  describe("DELETE /tasks/:id", function () {
    it("should delete a task", function () {
      // Arrange
      // Act
      // Assert
    });
  });
});
