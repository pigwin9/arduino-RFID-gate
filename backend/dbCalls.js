require('dotenv').config();
const mysql = require('mysql2/promise'); // <-- ZWRÓĆ UWAGĘ: `/promise`

// Połączenie
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Test połączenia
pool.getConnection()
  .then(conn => {
    console.log("✅ Połączenie z MySQL OK");
    conn.release();
  })
  .catch(err => {
    console.error("❌ Błąd połączenia z MySQL:", err);
  });

// Funkcje:
async function getWorkersStatus() {
  const [rows] = await pool.query("SELECT * FROM workers");
  return rows;
}

async function login(login, password) {
  const [rows] = await pool.query(
    "SELECT id, login, admin FROM users WHERE login = ? AND password = ?",
    [login, password]
  );

  if (rows.length === 0) return { token: 1 };

  return {
    id: rows[0].id,
    user: rows[0].login,
    admin: rows[0].admin,
  };
}

// Eksport
module.exports = {
  pool,
  getWorkersStatus,
  login,
};
