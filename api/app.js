const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const  Task  =require( './models/task');
const { getAllTasks, getDayTasks, addTask, updateTask } = require('./services/postgress');
const app = express()
const PORT = 3000
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/')
    .get((req, res) => {
        res.sendStatus(200)
    })

app.route('/tasks')
    .get(async (req, res) => {
        let user = req.query.body.user
        let tasks = await getAllTasks(user)
        res.send(tasks)
    })

app.route('/task')
    .get(async (req, res) => {
        let user = req.query.body.user
        console.log(user)
        let tasks = await getDayTasks(user)
        res.send(tasks)
    })
    .post(async (req, res) => {
        let name = req.body.task.name;
        let description = req.body.task.description
        let dueDay = req.body.task.dueDay
        let startTime = req.body.task.startTime
        let endTime = req.body.task.endTime
        let task = new Task(name, description, dueDay, startTime, endTime)
        let user = req.body.user
        let result = await addTask(task, user)
        res.send(result)

    })
    .put(async(req, res)=>{
        let id = req.body.task.id
        let user = req.body.user
        let result = await updateTask(id, user)
        res.send(result)
    })
//get days tasks
//add days tasks
//mark completed

app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server on Port:" + PORT)
    }
    else {
        console.debug("Server started and listening on PORT:" + PORT)
    }
})