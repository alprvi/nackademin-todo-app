import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import { tasksListModel } from "../src/models/tasksLists.model";
import { userModel } from "../src/models/users.model";
import app from "../src/app";
import { request } from "express";

chai.should();
chai.use(chaiHttp);

describe("TASK LIST INTEGRATION", function () {
  describe("POST /tasklist", function () {
    beforeEach(async function () {
      const user = await userModel.createUser({
        email: "test_user@email.com",
        password: "test_password",
        username: "test_username",
      });
      const userAdmin = await userModel.createUser({
        email: "test_user_admin@email.com",
        password: "test_password",
        username: "test_username",
        isAdmin: true,
      });
      const signedInUser = await userModel.login(
        "test_user@email.com",
        "test_password",
        "test_username"
      );
      const signedInUserAdmin = await userModel.login(
        "test_user_admin@email.com",
        "test_password",
        "test_username"
      );
      this.currentTest.userToken = signedInUser.token;
      this.currentTest.userAdminToken = signedInUserAdmin.adminToken;
      this.currentTest.userId = user._id.toString();
      this.currentTest.userAdminId = userAdmin._id.toString();
    });

    it("should create a task list", function () {
      const fields = { title: "test_tasklist" };
      chai
        .request(app)
        .post("/taskslists")
        .set("x-access-token", this.test.userToken)
        .set("Content-type", "application/json")
        .send(fields)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.have.keys(["_id", "title", "author", "tasks"]);
        });
    });

    it("should not create a task list because not authenticated", function () {
      const fields = { title: "test_tasklist" };
      chai
        .request(app)
        .post("/taskslists")
        .set("Content-type", "application/json")
        .send(fields)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.text).to.equal("You must sign in first");
        });
    });

    it("should edit a task list", async function () {
      // Arrange
      let tasksList = {
        title: "test_tasksList",
        author: this.test.userId,
      };
      const tasksListCreated = await tasksListModel.createTasksList(tasksList);
      const id = tasksListCreated._id.toString();
      const body = { title: "test_updated_tasksList" };
      // Act
      const res = await chai
        .request(app)
        .put(`/tasksList/${id}`)
        .set("x-access-token", this.test.userToken)
        .set("Content-Type", "application/json")
        .send({ id, body });
      // Assert

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an("object");
      res.body.should.havev.keys(["title", "_id", "author", "tasks"]);
    });

    it("should not edit a task list because not authenticated", async function () {
      // Arrange
      let tasksList = {
        title: "test_tasksList",
        author: this.test.userId,
      };
      const tasksListCreated = await tasksListModel.createTasksList(tasksList);
      const id = tasksListCreated._id.toString();
      const body = { title: "test_updated_tasksList" };
      // Act
      const res = await chai
        .request(app)
        .put(`/tasksList/${id}`)
        .set("x-access-token");
      // Assert
      res.should.have.statusCode(404);
    });
  });
});