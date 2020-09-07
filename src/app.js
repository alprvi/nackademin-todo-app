import express from "express";
import cors from "cors";
// import path from "path";

const app = express();

import databaseConnect from "./database";
import config from "./config";
import { router } from "./router";
import { notFound, logErrors } from "./middlewares";

if (config.environment !== "test") {
  databaseConnect();
}

// app.use(express.static(path.join(__dirname, "assets")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// error handlers
app.use(notFound);
app.use(logErrors);

const port = config.port;
app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});

export default app;
