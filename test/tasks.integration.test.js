require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const { dbDisconnect, dbConnect } = require("../src/config/database");
const tasksModel = require("../src/models/tasks.model");
const tasksListsModel = require("../src/models/tasksLists.model");
const userModel = require("../src/models/users.model");
const app = require("../app");

chai.should();
chai.use(chaiHttp);

describe("TASK INTEGRATION", function () {
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
    beforeEach(async function () {
      const user = await userModel.userModel.createUser({
        email: "test_user@email.com",
        password: "test_password",
        username: "test_username",
      });
      const userAdmin = await userModel.userModel.createUser({
        email: "test_user_admin@email.com",
        password: "test_password",
        username: "test_username",
        isAdmin: true,
      });
      const signedInUser = await userModel.userModel.login(
        "test_user@email.com",
        "test_password",
        "test_username"
      );
      const signedInUserAdmin = await userModel.userModel.login(
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
      const fields = {
        title: "task_test",
        tasksList: "5f5209f41513fa3e50510fb8",
      };
      chai
        .request(app)
        .post("/tasks")
        .set("x-access-token", this.test.userToken)
        .set("Content-type", "application/json")
        .send(fields)
        .end((err, res) => {
          chai.expect(err).to.be.null;
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
