const port = require('./serialPortSetup')

port.on('data', (data) => {
  console.log(data.toString());
})
