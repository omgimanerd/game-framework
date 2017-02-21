/**
 * @fileoverview This is the server app script.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const DEV_MODE = process.argv.indexOf('--dev') != -1;
const FPS = 60;
const PORT = process.env.PORT || 5000;

// Dependencies.
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const socketIO = require('socket.io');

const Game = require('./lib/Game');

// Initialization.
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var game = Game.create();

app.set('port', PORT);
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/shared', express.static(__dirname + '/shared'));

app.use('/', (request, response) => {
  response.render('index');
});

/**
 * Server side input handler, modifies the state of the players and the
 * game based on the input it receives. Everything here runs asynchronously.
 */
io.on('connection', (socket) => {
  socket.on('player-join', () => {
    game.addNewPlayer(socket);
  });

  socket.on('player-action', (data) => {
    game.updatePlayerOnInput(socket.id, data);
  });

  socket.on('disconnect', () => {
    game.removePlayer(socket.id);
  })
});

/**
 * Server side game loop. This runs at 60 frames per second.
 */
setInterval(() => {
  game.update();
  game.sendState();
}, 1000 / FPS);

/**
 * Starts the server.
 */
server.listen(PORT, function() {
  console.log(`STARTING SERVER ON PORT ${PORT}`);
  if (DEV_MODE) {
    console.log('DEVELOPMENT MODE ENABLED')
  }
});
