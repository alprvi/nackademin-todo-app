import chai from "chai";

import { userModel } from "./../src/resources/users/users.model";

chai.should();

describe("USER MODEL", function () {
  describe("POST /users", function () {
    it("should create a user", async function () {
      // Arrange
      const user = {
        email: "test_email@email.com",
        password: "test_password",
        username: "test_username",
      };
      // Act
      const result = await userModel.createUser(user);
      // Assert
      result.should.be.an("object");
      result.should.have.property("_id");
      result.should.have.property("email");
      result.should.have.property("password");
      result.should.have.property("createdAt");
      result.should.have.property("updatedAt");
      result.should.have.property("isAdmin");
      result.should.have.property("username");
    });
  });

  describe("Count users", function () {
    it("should return the number of users", async function () {
      // Arrange
      const user1 = {
        email: "test_email1@email.com",
        password: "test_password",
        username: "test_username",
      };
      const user2 = {
        email: "test_email2@email.com",
        password: "test_password",
        username: "test_username",
      };
      const user3 = {
        email: "test_email3@email.com",
        password: "test_password",
        username: "test_username",
      };

      // Act
      await userModel.createUser(user1);
      await userModel.createUser(user2);
      await userModel.createUser(user3);
      const result = await userModel.count();

      // Assert
      result.should.be.a("number").eq(3);
    });
  });

  describe("GET /users", function () {
    it("should return all the users", function () {
      // Arrange
      // Act
      // Assert
    });
  });
  describe("GET /users/:id", function () {
    it("should return a user by id", function () {
      // Arrange
      // Act
      // Assert
    });
  });
  describe("PUT /users/:id", function () {
    it("should update a user", function () {
      // Arrange
      // Act
      // Assert
    });
  });
  describe("DELETE /users/:id", function () {
    it("should delete a user", function () {
      // Arrange
      // Act
      // Assert
    });
  });
});
