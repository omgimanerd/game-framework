/**
 * @fileoverview This class encapsulates an active game on the server and
 *   handles the updating of the players and entities in the game.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var HashMap = require('hashmap');

var Util = require('../shared/Util');

/**
 * Constructor for the server side Game class.
 * Instantiates the data structures to track all the objects
 * in the game.
 * @constructor
 */
function Game() {
  /**
   * This is a hashmap containing all the connected socket ids and socket
   * instances as well as the packet number of the socket and their latency.
   */
  this.clients = new HashMap();

  /**
   * This is a hashmap containing all the connected socket ids and the players
   * associated with them. This should always be parallel with sockets.
   */
  this.players = new HashMap();
}

/**
 * Creates a new player with the given name and ID.
 */
Game.prototype.addNewPlayer = function() {
};

/**
 * Removes the player with the given socket ID and returns the name of the
 * player removed.
 */
Game.prototype.removePlayer = function() {
};

/**
 * Updates the player with the given ID according to the
 * input state sent by that player's client.
 */
Game.prototype.updatePlayerOnInput = function() {
};

/**
 * Sends the state of the game to all the connected sockets after
 * filtering them appropriately.
 */
Game.prototype.sendState = function() {
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Game;
