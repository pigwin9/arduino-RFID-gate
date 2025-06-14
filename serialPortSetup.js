const SerialPort = require('serialport');


// setup
const port = new SerialPort.SerialPort({
  path: 'COM3',
  baudRate: 9600,
});

// setup test
port.on('open', () => {
        console.log(`Port opened successfully`);
        port.close();
});

// handle error
port.on('error', (err) => {
  console.log('Error:', err.message);
});

// Read data from the serial port
module.exports = port