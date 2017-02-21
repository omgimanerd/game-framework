/**
 * @fileoverview This is a class encapsulating a Player.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Entity2D = require('./Entity2D');

const Util = require('../shared/Util');

/**
 * Constructor for a Player
 * @constructor
 * @param {string} id The socket ID of the Player
 */
function Player(id) {
  Entity2D.call(this, [10, 10], null, null, null, null, Player.HITBOX);
  this.id = id;
}
Util.extend(Player, Entity2D);

Player.HITBOX = 10;

/**
 * Factory method for creating a Player
 * @param {string} id The socket ID of the Player
 * @return {Player}
 */
Player.create = function(id) {
  return new Player(id);
};

/**
 * Updates the Player based on received input.
 * @param {Object} keyboardState The keyboard input received.
 */
Player.prototype.updateOnInput = function(keyboardState) {
  this.vy = 100 * (Number(keyboardState.down) - Number(keyboardState.up));
  this.vx = 100 * (Number(keyboardState.right) - Number(keyboardState.left));
};

/**
 * Steps the Player forward in time and updates the internal position, velocity,
 * etc.
 */
Player.prototype.update = function() {
  this.parent.update.call(this);
};

module.exports = Player;
