import mongoose from "mongoose";
import appConfig from "./../src/config";

const config = appConfig;

// Connect to test database before we run the test
before(function (done) {
  mongoose.connect(config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once("open", () => {
      console.log("Connection to MongoDB is Ready");
      done();
    })
    .on("error", (error) => {
      console.error(`Something when wrong: ${error}`);
    });
});

// Drop the collection before each test
beforeEach(async function () {
  // mongoose.connection.collections.tasks.drop()
  await mongoose.connection.collections.taskslists.remove({});
  await mongoose.connection.collections.users.remove({});
});
