const express = require("express");
const routes = require("express").Router();
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const networkController = require("../Assignment1/Controller/Network/TaskController");

routes.use("/tasks", networkController);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
