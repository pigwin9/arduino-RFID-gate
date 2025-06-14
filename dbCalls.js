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
module.exports = {
    getUsers,
    createWorker
};