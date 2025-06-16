const SerialPort = require('serialport');
const dbCalls = require('./dbCalls');

// Setup
const port = new SerialPort.SerialPort({
    path: 'COM3',
    baudRate: 9600,
});

// Event handlers
port.on('open', () => {
    console.log('Port opened successfully');
    
    // Start listening for data
    port.on('data', (data) => {
        if(data != ""){
            dbCalls.in_out(data.toString());
        };
    });
});
port.on('error', (err) => {
    console.log('Error:', err.message);
});


