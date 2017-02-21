/**
 * @fileoverview This class encapsulates an active game on the server and
 *   handles game updates.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const HashMap = require('hashmap');
const Player = require('./Player');
const Util = require('../shared/Util');

/**
 * Constructor for a Game object.
 * @constructor
 */
function Game() {
  this.clients = new HashMap();
  this.players = new HashMap();
}

/**
 * Factory method for a Game object.
 * @return {Game}
 */
Game.create = function() {
  return new Game();
};

/**
 * Returns a list containing the connected Player objects.
 * @return {Array<Player>}
 */
Game.prototype.getPlayers = function() {
  return this.players.values();
};

/**
 * Returns callbacks that can be passed into an update()
 * method for an object so that it can access other elements and
 * entities in the game.
 * @return {Object<string, Function>}
 */
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
 * @param {string} id The socket ID of the client
 * @param {Object} data The input received from the client
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

/**
 * Sends the state of the game to every client.
 */
Game.prototype.sendState = function() {
  var ids = this.clients.keys();
  for (var i = 0; i < ids.length; ++i) {
    this.clients.get(ids[i]).emit('update', {
      self: this.players.get(ids[i]),
      players: this.players.values().filter((player) => player.id != ids[i])
    });
  }
};

module.exports = Game;
