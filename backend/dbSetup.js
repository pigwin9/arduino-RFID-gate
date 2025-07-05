require('dotenv').config();
const mysql = require('mysql2');

// setup
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}).promise();

// test
pool.getConnection()
  .then(connection => {
    console.log('✅ Successfully connected to MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });


// FUNKCJE =======================

async function login(login, password) {
  const [rows] = await pool.query(
    "SELECT id, login, admin FROM users WHERE login = ? AND password = ?",
    [login, password]
  );

  if (rows.length === 0) return { token: 1 };

  const user = rows[0];

  return {
    id: user.id,
    user: user.login,
    admin: user.admin,
  };
}

async function getWorkersStatus() {
  const [rows] = await pool.query("SELECT * FROM workers");
  return rows;
}

// inne funkcje jak createUser itd. możesz tu dopisać

// EXPORT ========================
module.exports = {
  login,
  getWorkersStatus,
  pool, // tylko jeśli naprawdę chcesz używać ręcznie
};
