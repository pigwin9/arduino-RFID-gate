const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./dbSetup');
const myEmitter = require('./emitter');
const { format } = require('path');

async function getWorkersStatus() {
  const [rows] = await pool.query("SELECT id, name, surname, status FROM workers WHERE 1")
  return rows
}

async function getWorkers() {
  let workersTable= []
  const [workers] = await pool.query("SELECT id, name, surname FROM workers WHERE 1");
  for(i = 0; i < workers.length; i++) {
    const id = workers[i].id;
    const name = workers[i].name;
    const surname = workers[i].surname;
    workersTable.push({id: id, name: name, surname: surname})
  }
  return(workersTable);
}

async function deleteWorker(id){
  const worker = await pool.query("SELECT * FROM workers WHERE id =" + id.toString())
  console.log(worker.length)
  if(!worker){
    console.log(aa)
  }
  const status = await pool.query("DELETE FROM workers WHERE id =" + id.toString())
  return status
}

async function createWorker(name, surname) {
  const [result] = await pool.query(`
  INSERT INTO workers (name, surname)
  VALUES (?, ?)
  `, [name, surname])
}

//authentication related functions
async function hashPassword(password) {
    const hash = await bcrypt.hash(password, 13);
    return hash;
}

async function createUser(worker, login, password, admin) {
  //check if login exists
  const [user] = await pool.query("SELECT id FROM users WHERE login ='" + login +"';");
  if(user.length == 0){
    //if dont, create new user
    password = await hashPassword(password);
    const [newUser] = await pool.query(
            "INSERT INTO users (worker, login, password, admin) VALUES (?, ?, ?, ?)", 
            [worker, login, password, admin]
        );
        return newUser;
  }
  else{
    return 1
    //already existing user logic
  }
}


async function login(login, password) {
  const [user] = await pool.query("SELECT * FROM users WHERE login = '" + login + "'");
  console.log(user)
  const PasswordCheck = await bcrypt.compare (password, user[0].password);
  console.log(PasswordCheck);
  if(PasswordCheck === true){
    const token = jwt.sign({ id: user[0].id, username: user[0].login, admin: user[0].admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const admin = user[0].admin
    const username = user[0].login
    const id = user[0].worker
    console.log(username);
    return {token: token, user: username, admin: admin, id: id}
  }
  else{
    return 1
  }
}

//get worker entries
async function getWorkerTimes(id){
  function countWorkingTime(a, b) {
    const inTime = moment("2025-07-06T" + a.toString()).toDate();
    const outTime = moment("2025-07-06T" + b.toString()).toDate();
    const workingTime = outTime - inTime;
    let seconds = Math.floor(workingTime / 1000);
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    const pad = (num) => num.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  let entriesTable= []
  const [entries] = await pool.query("SELECT * FROM working_time WHERE worker = '" + id + "' ORDER BY id DESC");
  for(i = 0; i < entries.length; i++) {
    const id = entries[i].id;
    const inTime = entries[i].time_in;
    const outTime = entries[i].time_out;
    let date = entries[i].date;
    date = moment(date).format('YYYY-MM-DD');
    workingTime = countWorkingTime(inTime, outTime);
    entriesTable.push({id: id, inTime: inTime, outTime: outTime, date: date, workingTime: workingTime})
  }
  return(entriesTable);
}


async function in_out(card){
  //get time and date
  const currentTime = moment().format('HH:mm:ss');
  const currentDate = moment().format('YYYY-MM-DD');


  //get worker id and status
  var id = ""
  var status = ""
  const [workerRow] = await pool.query("SELECT id, status FROM workers WHERE card = '" + card + "';");
  if(workerRow.length != 0){
    id = workerRow[0].id
    status = workerRow[0].status
  }
  else{
    console.log("that card has no worker");
    console.log(card)
    return 1
  }


  //check worker status
  if(status === 0){
    //add entry time
     await pool.query(
        "INSERT INTO working_time (worker, time_in, date) VALUES (?, ?, ?)",
        [id, currentTime, currentDate]
    );
    //change worker status
    await pool.query(
      "UPDATE workers SET status = 1 WHERE id = ?",
      [id]
    )
    myEmitter.emit('refreshStatusPage');
    console.log("\r\nadded entry time: " + currentDate.toString() + " " + currentTime.toString() + "\r\ncard:" + card.toString());
  }else{
    //add exit time
    await pool.query(
      "UPDATE working_time SET time_out = ? WHERE date = ?",
      [currentTime, currentDate]
    )
    //change worker status
    await pool.query(
      "UPDATE workers SET status = 0 WHERE id = ?",
      [id]
    )
    myEmitter.emit('refreshStatusPage');
    console.log("\r\nadded exit time: " + currentDate.toString() + " " + currentTime.toString() + "\r\ncard:" + card.toString())
  }

}
module.exports = {
    getWorkersStatus,
    createWorker,
    in_out,
    login,
    hashPassword,
    createUser,
    getWorkerTimes,
    getWorkers,
    deleteWorker
};
