const moment = require('moment');
const pool = require('./dbSetup');
const EventEmitter = require('events');

async function getWorkersStatus() {
  const [rows] = await pool.query("SELECT id, name, surname, status FROM workers WHERE 1")
  return rows
}

async function createWorker(name, surname) {
  const [result] = await pool.query(`
  INSERT INTO workers (name, surname)
  VALUES (?, ?)
  `, [name, surname])
}

global.myEmitter = new EventEmitter();
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
    console.log("that card has no worker")
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
};
