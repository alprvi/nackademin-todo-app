require("dotenv").config();
const mongoose = require("mongoose");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
let mongoDB;

switch (process.env.NODE_ENV) {
  case "development":
  case "dev":
  case "staging":
    mongoDB = {
      getUri: async () =>
        `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}/${process.env.DBNAME}?retryWrites=truew=majority`,
    };
    console.log("staging");
    break;
  case "test":
    const { MongoMemoryServer } = require("mongodb-memory-server");
    mongoDB = new MongoMemoryServer();
    break;
  default:
    throw new Error(`${process.env.NODE_ENV} is not a valid environment`);
}

const dbConnect = async () => {
  const uri = await mongoDB.getUri();
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.error(`Something when wrong: ${error}`);
  }
};

const dbDisconnect = async () => {
  try {
    await mongoose.connection.close(() => {
      console.log("Disconnected from MongoDB");
    });

    if (process.env.NODE_ENV === "test") {
      await mongoDB.stop();
    }
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.once("open", function () {
  console.log(`MongoDB ${process.env.NODE_ENV} is Ready!!`);
});

module.exports = { dbConnect, dbDisconnect };
