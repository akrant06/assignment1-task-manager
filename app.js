const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

const taskList = [
    {
        "id": 1,
        "title": "Task 1",
        "description": "This is first Task of assignment 1",
        "completed": false
      },
      {
        "id": 2,
        "title": "Task 2",
        "description": "This is second Task of assignment 1",
        "completed": false
      },
      {
        "id": 3,
        "title": "Task 3",
        "description": "This is third Task of assignment 1",
        "completed": false
      },
      {
        "id": 4,
        "title": "Task 4",
        "description": "This is fourth Task of assignment 1",
        "completed": false
      },
      {
        "id": 5,
        "title": "Task 5",
        "description": "This is fifth Task of assignment 1",
        "completed": false
      }
]

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
    res.send(taskList);
});

app.get('/tasks/:task_id', (req, res) => {
    const taskId = req.params.task_id;
    const task = taskList.find(task => task.id == parseInt(taskId));
    if (task) {
        res.send(task);
    } else {
        res.status(404).send('Task not found');
    }
});

app.post('/tasks', (req, res) => {
    const task = req.body;
    task.id = taskList.length + 1;
    taskList.push(task);
    res.send(task);
});

app.put('/tasks/:task_id', (req, res) => {
const taskid = req.params.task_id;
const taskbody = req.body
const task = taskList.find(task => task.id == taskid);

});

app.delete('/tasks/{task_id}', (req, res) => {


});



module.exports = app;