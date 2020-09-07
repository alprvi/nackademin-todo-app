const testConfig = {
  port: process.env.PORT || 4000,
  database: process.env.TEST_DATABASE,
  secrets: { JWT_SECRET: process.env.JWT_SECRET },
  environment: "test",
};

export default testConfig;
