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


