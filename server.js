const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];

// Create a Task
//This endpoint create a new task with title and description and gets stored in the tasks array.
//Implemented UUID to generate unique id for each task.
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  const newTask = { id: uuidv4(), title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get All Tasks
//Returns all the tasks stored in the tasks array.
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get a Single Task
//This endpoint returns a single task with the given id
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// Update a Task
//This endpoint updates a task with the given id with the title and description provided in the request body.
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  const { title, description } = req.body;
  if (title) task.title = title;
  if (description) task.description = description;
  res.json(task);
});

// Delete a Task
//This endpoint deletes a task with the given id.
app.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  res.json({ message: "Task deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
