/*
    This is the file where you will create the routes for task APIs application.
*/

const express = require("express");
const networkRouter = require("express").Router();
const URLQueryParams = require("url-search-params");
const Validator = require("../../Utility/Validator");
networkRouter.use(express.json());

let taskList = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
  {
    id: 2,
    title: "Create a new project",
    description: "Create a new project using the Express application generator",
    completed: true,
  },
  {
    id: 3,
    title: "Install nodemon",
    description: "Install nodemon as a development dependency",
    completed: true,
  },
  {
    id: 4,
    title: "Install Express",
    description: "Install Express",
    completed: false,
  },
  {
    id: 5,
    title: "Install Mongoose",
    description: "Install Mongoose",
    completed: false,
  },
  {
    id: 6,
    title: "Install Morgan",
    description: "Install Morgan",
    completed: false,
  },
  {
    id: 7,
    title: "Install body-parser",
    description: "Install body-parser",
    completed: false,
  },
  {
    id: 8,
    title: "Install cors",
    description: "Install cors",
    completed: false,
  },
  {
    id: 9,
    title: "Install passport",
    description: "Install passport",
    completed: false,
  },
  {
    id: 10,
    title: "Install passport-local",
    description: "Install passport-local",
    completed: false,
  },
  {
    id: 11,
    title: "Install passport-local-mongoose",
    description: "Install passport-local-mongoose",
    completed: false,
  },
  {
    id: 12,
    title: "Install express-session",
    description: "Install express-session",
    completed: false,
  },
  {
    id: 13,
    title: "Install connect-mongo",
    description: "Install connect-mongo",
    completed: false,
  },
  {
    id: 14,
    title: "Install dotenv",
    description: "Install dotenv",
    completed: false,
  },
  {
    id: 15,
    title: "Install jsonwebtoken",
    description: "Install jsonwebtoken",
    completed: false,
  },
];

// Get all tasks
networkRouter.get("/", (req, res) => {
  // Send the taskList array as a response
  res.send(taskList);
});

// Get a specific task by id
networkRouter.get("/:id", (req, res) => {
  const taskId = req.params.id;
  const task = taskList.find((task) => task.id == parseInt(taskId));
  if (task) {
    // Send the task object as a response
    res.send(task);
  } else {
    // Send a 404 status with the message "Task not found"
    res.status(404).send("Task not found");
  }
});

// Add a new task
networkRouter.post("/", (req, res) => {
  const task = req.body;
  if (Validator.validateTaskRequest(task, "POST").status) {
    // Add a unique id to the task object
    task.id = taskList.length + 1;
    taskList.push(task);
    // Send the new task object as a response
    res.status(201).send(task);
  } else {
    res.status(400).send("Please check request and send valid data.");
  }
});

// Update a task by id
networkRouter.put("/:id", (req, res) => {
  const taskid = req.params.id;
  const taskbody = req.body;
  if (Validator.validateTaskRequest(taskbody, "PUT").status) {
    // Update the task object with new data from the request body
    const task = taskList.find((task) => task.id == taskid);
    if (task) {
      task.title = taskbody.title;
      task.description = taskbody.description;
      task.completed = taskbody.completed;
      // Send the updated task object as a response
      res.status(200).send(task);
    } else {
      // Send a 404 status with the message "Task not found"
      res.status(404).send("Task not found");
    }
  } else {
    res.status(400).send("Please check request and send valid data.");
  }
});

// Delete a task by id
networkRouter.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  const taskIndex = taskList.findIndex((task) => task.id == parseInt(taskId));

  if (taskIndex !== -1) {
    // Remove the task from the taskList array
    taskList.splice(taskIndex, 1);
    // Send a 200 status (No Content) as a response
    res.status(200).send("Task removed successfully");
  } else {
    // Send a 404 status with the message "Task not found"
    res.status(404).send("Task not found");
  }
});

module.exports = networkRouter;
