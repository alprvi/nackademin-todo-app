import express from "express";
import cors from "cors";

const app = express();

import databaseConnect from "./database";
import config from "./config";
import { router } from "./routes/router";
import { notFound, logErrors } from "./middlewares";

if (config.environment !== "test") {
  databaseConnect();
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// error handlers
app.use(notFound);
app.use(logErrors);

// const port = config.port;
// app.listen(port, () => {
//   console.log(`Server started on localhost:${port}`);
// });

export default app;
