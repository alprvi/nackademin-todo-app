import mongoose from "mongoose";
import appConfig from "./config";

const databaseConnect = async (config = appConfig) => {
  try {
    await mongoose.connect(config.database, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB is Ready");
  } catch (error) {
    console.error(`Something when wrong: ${error}`);
  }
};

export default databaseConnect;
