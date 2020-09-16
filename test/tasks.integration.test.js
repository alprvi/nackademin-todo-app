import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import { taskModel } from "../src/models/tasks.model";
import { userModel } from "../src/models/users.model";
import app from "../src/app";

chai.should();
chai.use(chaiHttp);

describe("TASK INTEGRATION", function () {
  describe("POST /tasks", function () {
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

    it("should create a task", function () {
      const fields = { title: "task_test", tasksList: "tasksList_test" };
      chai
        .request(app)
        .post("/tasks")
        .set("x-access-token", this.test.userToken)
        .set("Content-type", "application/json")
        .send(fields)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.have.keys([
            "_id",
            "author",
            "title",
            "tasksList",
            "isDone",
            "isUrgent",
          ]);
        });
    });

    it("should edit a task", function () {});

    it("should delete a task", function () {});

    it("should not delete a task and throw an error", function () {});
  });
});
