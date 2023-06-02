const { Pool } = require('pg')
const { task } = require('../models/task')
const pool = new Pool({
    host: 'postgres.cw6zbbgxiti2.us-west-2.rds.amazonaws.com',
    user: 'RydgeSoftware',
    password: 'Farmerslayer12',
    database: 'postgres',
    port: '5432',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

function getTodaysDate(){
    let date = new Date();
    let month = Number(date.getMonth()) + 1
    return date.getFullYear() + ":" + month+ ":" + date.getDate();
}

//add task
async function addTask(task, user) {
    let id = user.id;

    let query = `INSERT INTO "DailySchedule".task
    ("name", description, due_date, start_time, end_time, date_added, user_id, completed)
    VALUES('${task.name}', '${task.dateAdded}', '${task.dueDay}', '${task.startTime}', '${task.endTime}',  '${task.description}', ${id}, false);
    `
    let result = await pool.query(query)
    let due_date = getTodaysDate()
    query = `SELECT id, "name", description, due_date, start_time, end_time, date_added, user_id, completed
    FROM "DailySchedule".task where user_id= ${id} and due_date = '${due_date}';`
    let ret = await pool.query(query)
    return ret.rows
}

//get days tasks
async function getDayTasks(user) {
    let id = user.id;
    let due_date = getTodaysDate()
    console.log(due_date)
    let query = `SELECT id, "name", description, due_date, start_time, end_time, date_added, user_id, completed
    FROM "DailySchedule".task where user_id= ${id} and due_date = '${due_date}';`
    let ret = await pool.query(query)
    return ret.rows
}



//mark completedgsdfgs
async function updateTask(taskid, user) {
    let userid = user.id;
    console.log()
    let query = `UPDATE "DailySchedule".task
    SET  completed=true where id=${taskid} and user_id = ${userid};`
    let result = await pool.query(query)
    let due_date =getTodaysDate()
    query = `SELECT id, "name", description, due_date, start_time, end_time, date_added, user_id, completed
    FROM "DailySchedule".task where user_id= ${userid} and due_date = '${due_date}';`
    let ret = await pool.query(query)
    return ret.rows
}

//get All task by user
async function getAllTasks(user) {
    let id = user.id;
    let query = `SELECT id, "name", description, due_date, start_time, end_time, date_added, user_id, completed
    FROM "DailySchedule".task where user_id= ${id};`
    let ret = await pool.query(query)
    return ret.rows
}
module.exports = { addTask ,getDayTasks,updateTask,getAllTasks}
