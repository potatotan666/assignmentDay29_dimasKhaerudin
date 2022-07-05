const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const userRouter = require("./routes/users");

app.use(bodyParser.json());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
