/**
 * @fileoverview This class encapsulates an active game on the server and
 *   handles game updates.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const HashMap = require('hashmap');
const Player = require('./Player');
const Util = require('../shared/Util');

function Game() {
  this.clients = new HashMap();
  this.players = new HashMap();
}

Game.create = function() {
  return new Game();
};

Game.prototype.getPlayers = function() {
  return this.players.values();
};

Game.prototype._callbacks = function() {
  return {
    players: Util.bind(this, this.players)
  };
};

Game.prototype.addNewPlayer = function(socket, data) {
  this.clients.set(socket.id, socket);
  this.players.set(socket.id, Player.create(socket.id, [10, 10]));
};

Game.prototype.removePlayer = function(id) {
  this.clients.remove(id);
  this.players.remove(id);
}

/**
 * Updates a player based on input received from their client.
 */
Game.prototype.updatePlayerOnInput = function(id, data) {
  var player = this.players.get(id);
  if (player) {
    player.updateOnInput(data.keyboardState);
  }
}

/**
 * Steps the server forward in time. Updates every entity in the game.
 */
Game.prototype.update = function() {
  var players = this.getPlayers();
  for (var i = 0; i < players.length; ++i) {
    players[i].update();
  }
};

Game.prototype.sendState = function() {
  var ids = this.clients.keys();
  for (var i = 0; i < ids.length; ++i) {
    /**
     * Send the state of the game to every client.
     */
    this.clients.get(ids[i]).emit('update', {
      self: this.players.get(ids[i]),
      players: this.players.values().filter((player) => player.id != ids[i])
    });
  }
};

module.exports = Game;
