require('dotenv').config();
const mysql = require('mysql2');


//setup
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}).promise();

//connection test
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });


module.exports = pool