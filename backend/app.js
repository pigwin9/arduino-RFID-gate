const express = require('express');
const dbCalls = require('./dbCalls')
const serialPort = require("./serialPort");
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors')


app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Heslloa World!');
  dbCalls.in_out(" 4A 4E 0C C1");
  
});

app.get('/getWorkersStatus', async (req, res) => {
  const workers = await dbCalls.getWorkersStatus()
  res.send(workers)
});

app.post("/createWorker", async (req, res) => {
  const { name, surname } = req.body
  const worker = await dbCalls.createWorker(name, surname)
  res.status(201).send(worker)
})

app.post("/createUser", async (req, res) => {
  const { worker, login, password, admin } = req.body
  const user = await dbCalls.createUser(worker, login, password, admin);
  if(user === 1){
    res.status(200).send("user already exists")
  }
  else{
    res.status(201).send(user);
  }
})

app.post("/createPassword", async (req, res) =>{
  const { password } = req.body
  const hashPassword= await dbCalls.hashPassword(password)
  res.status(201).send(hashPassword)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke')
})

app.post("/login", async (req, res) => {
  const {login, password} = req.body;
  const user = await dbCalls.login(login, password);
  console.log(user);
  if(user.token === 1){
    res.status(401).send("invalid credentials")
  }
  else{
    res.status(201).send({token: user.token, name: user.user, admin: user.admin});
  }
} )



function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403);
    const decodedToken = jwt.decode(token);
    next();
  });
}

function isAdmin(req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const decodedToken = jwt.decode(token)
  if(decodedToken.admin === 0){
    return res.sendStatus(403)
  }
  else{
  }
}

app.get('/protected', authenticateToken,  (req, res) => {
  res.sendStatus(200)
});

app.get('/adminProtected', authenticateToken, isAdmin, (req, res) => {
  res.sendStatus(200)
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/statusTick', (req, res) => {
  // SEE config
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });

  //initial message
  res.write(`data: Connected to server\n\n`);

  
  myEmitter.on('refreshStatusPage', () => {
    res.write(`data: refresh\n\n`);
});

  //closing connection
  req.on('close', () => {
    res.end();
  });
});
