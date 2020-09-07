const devConfig = {
  port: process.env.PORT || 4000,
  database: process.env.DATABASE,
  secrets: { JWT_SECRET: process.env.JWT_SECRET },
  environment: "dev" || "devlopment",
};

export default devConfig;
