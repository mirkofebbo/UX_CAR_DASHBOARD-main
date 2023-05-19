const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const { connectToTXRacingWheel } = require('./util/txracingwheel');

const clientId = '12579dc6ad3c47d3806657fa397db46b'
const clientSecret = '73004d1041ef4c27b3a3ebf5bc4f71ed'
const redirectUri = 'http://localhost:3000';

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', // Allow all origins, or specify your React app's origin here
    methods: ['GET', 'POST'],
  },
});
// Handle wheel data
connectToTXRacingWheel(
  (error) => {
    if (error) {
      console.error('Error:', error);
    }
  },
  (simplifiedData) => {
    console.log('Data:', simplifiedData);
    io.emit('DATA', simplifiedData);
  }
);

//==== USB SERVER ================================================
// Serve the React build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

