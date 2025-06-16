const moment = require('moment');
const pool = require('./dbSetup');

async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users")
  return rows
}

async function createWorker(name, surname) {
  const [result] = await pool.query(`
  INSERT INTO workers (name, surname)
  VALUES (?, ?)
  `, [name, surname])
}

async function in_out(card){
  //get time and date
  const currentTime = moment().format('HH:mm:ss');
  const currentDate = moment().format('YYYY-MM-DD');



  //get worker id
  var id = ""
  const [workerRow] = await pool.query("SELECT id FROM workers WHERE card = '" + card + "';");
  if(workerRow.length != 0){
    id = workerRow[0].id
  }
  else{
    console.log("that card has no worker")
    return 1
  }

  //check if worker is going in or out
  const [row] = await pool.query("SELECT * FROM working_time WHERE date = '" + currentDate + "' AND worker = " + id +"")
  if(row.length === 0 ){
    //add entry time
     await pool.query(
        "INSERT INTO working_time (worker, time_in, date) VALUES (?, ?, ?)",
        [id, currentTime, currentDate]
    );
    console.log("\r\nadded entry time: " + currentDate.toString() + " " + currentTime.toString() + "\r\ncard:" + card.toString());
  }
  else{
    //add exit time
    await pool.query(
      "UPDATE working_time SET time_out = ? WHERE id = ?",
      [currentTime, row[0].id]
    )
    console.log("\r\nadded exit time: " + currentDate.toString() + " " + currentTime.toString() + "\r\ncard:" + card.toString())
  }

}
module.exports = {
    getUsers,
    createWorker,
    in_out
};
