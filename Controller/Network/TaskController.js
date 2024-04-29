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
    title: "Task 1",
    description: "This is first Task of assignment 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is second Task of assignment 1",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is third Task of assignment 1",
    completed: false,
  },
  {
    id: 4,
    title: "Task 4",
    description: "This is fourth Task of assignment 1",
    completed: false,
  },
  {
    id: 5,
    title: "Task 5",
    description: "This is fifth Task of assignment 1",
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
    res.send(task);
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
      res.send(task);
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
    // Send a 204 status (No Content) as a response
    res.status(204).send("Task removed successfully");
  } else {
    // Send a 404 status with the message "Task not found"
    res.status(404).send("Task not found");
  }
});

module.exports = networkRouter;
