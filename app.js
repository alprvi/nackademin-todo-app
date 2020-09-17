const express = require("express");
const cors = require("cors");

const app = express();

const router = require("./src/routes/router");
const { notFound, logErrors } = require("./src/middlewares");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// error handlers
app.use(notFound);
app.use(logErrors);

module.exports = app;
