import chai from "chai";

import { tasksListModel } from "../src/models/tasksLists.model";

chai.should();

describe("TASK LIST MODEL", function () {
  describe("POST /taskslist", function () {
    it("should create a tasks list", async function () {
      // Arrange
      const taskList = {
        title: "test_taskList",
        author: "test_author",
      };
      // Act
      const result = await tasksListModel.createTasksList(taskList);
      // Assert
      result.should.be.an("object");
      result.should.have.property("_id");
      result.should.have.property("title");
      result.should.have.property("author");
      result.should.have.property("createdAt");
      result.should.have.property("updatedAt");
      result.should.have.property("tasks");
    });
  });

  describe("GET /taskslists", function () {
    it("should return all the taskslists", function () {
      // Arrange
      // Act
      // Assert
    });
  });
  describe("GET /taskslists/:id", function () {
    it("should return a tasksList by id", function () {
      // Arrange
      // Act
      // Assert
    });
  });
  describe("PUT /taskslists/:id", function () {
    it("should update a tasksList", function () {
      // Arrange
      // Act
      // Assert
    });
  });
  describe("DELETE /taskslists/:id", function () {
    it("should delete a tasksList", function () {
      // Arrange
      // Act
      // Assert
    });
  });
});
