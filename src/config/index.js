import merge from "lodash.merge";
import devConfig from "./dev";
import testConfig from "./test";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV;

const baseConfig = {
  secret: {},
};

let envConfig = {};

switch (env) {
  case "development":
  case "dev":
    envConfig = devConfig;
    break;
  case "test":
    envConfig = testConfig;
    break;
  default:
    envConfig = devConfig;
}
export default merge(baseConfig, envConfig);
