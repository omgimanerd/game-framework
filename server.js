/**
 * @fileoverview This is the server app script.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const DEV_MODE = process.argv.indexOf('--dev') != -1;
const FRAME_RATE = 1000 / 60;
const PORT = process.env.PORT || 5000;

// Dependencies.
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const socketIO = require('socket.io');

// Initialization.
var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', PORT_NUMBER);
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/shared', express.static(__dirname + '/shared'));

app.use('/', (request, response) => {
  response.render('index');
});

/**
 * Server side input handler, modifies the state of the players and the
 * game based on the input it receives. Everything runs asynchronously with
 * the game loop.
 */
io.on('connection', game.getSocketCallback());

/**
 * Server side game loop.
 */
setInterval(() => {
  game.update();
}, FRAME_RATE);

/**
 * Starts the server.
 */
server.listen(PORT, function() {
  console.log(`STARTING SERVER ON PORT ${PORT}`);
  if (DEV_MODE) {
    console.log('DEVELOPMENT MODE ENABLED')
  }
});
