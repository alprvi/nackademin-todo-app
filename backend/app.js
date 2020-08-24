const express = require("express");
const app = express();
const router = require("./router/routes");
const cors = require("cors");

var Datastore = require("nedb-promise");
db = {};
db.todoItems = new Datastore({
  filename: __dirname + "/database/todoItems.db",
  timestampData: true,
});

// You need to load each database (here we do it asynchronously)
db.todoItems.loadDatabase();

app.use(express.json());
app.use("/", router);
app.use(cors());

app.listen(3000, () => console.log("listening on port 3000"));
