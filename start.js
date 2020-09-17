const port = process.env.PORT || 4000;

const app = require("./app");
const { dbConnect } = require("./src/config/database");

app.listen(port, async () => {
  console.log(`Server started on localhost:${port}`);
  await dbConnect();
});
