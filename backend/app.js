const express = require('express');
const dbCalls = require('./dbCalls')
const serialPort = require("./serialPort");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors')


app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Heslloa World!');
  dbCalls.in_out("");
  
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

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke')
})

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
