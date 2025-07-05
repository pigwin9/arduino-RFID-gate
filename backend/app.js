const express = require('express');
const dbCalls = require('./dbCalls');
const serialPort = require("./serialPort");
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();


app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "tajnehaslo";

// Strona główna
app.get('/', (req, res) => {
  res.send('Hello World!');
  dbCalls.in_out(" 4A 4E 0C C1");
});

// Pracownicy
app.get('/getWorkersStatus', async (req, res) => {
  const workers = await dbCalls.getWorkersStatus();
  res.send(workers);
});

app.post("/createWorker", async (req, res) => {
  const { name, surname } = req.body;
  const worker = await dbCalls.createWorker(name, surname);
  res.status(201).send(worker);
});

app.post("/createUser", async (req, res) => {
  const { worker, login, password, admin } = req.body;
  const user = await dbCalls.createUser(worker, login, password, admin);
  if (user === 1) {
    res.status(200).send("user already exists");
  } else {
    res.status(201).send(user);
  }
});

app.post("/createPassword", async (req, res) => {
  const { password } = req.body;
  const hashPassword = await dbCalls.hashPassword(password);
  res.status(201).send(hashPassword);
});

// 🔐 Login z generowaniem JWT
app.post("/login", async (req, res) => {
  const { login, password } = req.body;
  const user = await dbCalls.login(login, password);

  if (!user || user.token === 1) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      admin: user.admin,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).send({
    token,
    name: user.user,
    admin: user.admin,
  });
});

// 🛡 Middleware do autoryzacji
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT VERIFY ERROR:", err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// 🛡 Middleware: tylko admin
function isAdmin(req, res, next) {
  const { admin } = req.user || {};
  if (admin === 1) {
    next();
  } else {
    res.sendStatus(403);
  }
}

// 🔐 Chronione endpointy
app.get('/protected', authenticateToken, (req, res) => {
  res.sendStatus(200);
});

app.get('/adminProtected', authenticateToken, isAdmin, (req, res) => {
  res.sendStatus(200);
});

// SSE: aktualizacja statusu
app.get('/statusTick', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  res.write(`data: Connected to server\n\n`);

  myEmitter.on('refreshStatusPage', () => {
    res.write(`data: refresh\n\n`);
  });

  req.on('close', () => {
    res.end();
  });
});

// Obsługa błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
