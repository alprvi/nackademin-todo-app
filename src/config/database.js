require("dotenv").config();
const mongoose = require("mongoose");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
let config = "";

const testConfig = {
  port: process.env.PORT || 4000,
  database: process.env.TEST_DATABASE,
  secrets: { JWT_SECRET: process.env.JWT_SECRET },
  environment: "test",
};

const devConfig = {
  port: process.env.PORT || 4000,
  database: process.env.DATABASE,
  secrets: { JWT_SECRET: process.env.JWT_SECRET },
  environment: "dev" || "devlopment",
};

switch (process.env.NODE_ENV) {
  case "development":
  case "dev":
    config = devConfig;
    break;
  case "test":
    config = testConfig;
    break;
  default:
    config = devConfig;
}

console.log(config);

const dbConnect = async () => {
  try {
    await mongoose.connect(config.database, {
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
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.once("open", function () {
  console.log(`MongoDB ${process.env.NODE_ENV} is Ready!!`);
});

module.exports = { dbConnect, dbDisconnect };
