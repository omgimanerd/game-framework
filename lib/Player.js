/**
 * @fileoverview This is a class encapsulating a Player.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Entity2D = require('./Entity2D');

const Util = require('../shared/Util');

function Player(id) {
  Entity2D.call(this, [10, 10], null, null, null, null, Player.HITBOX);
  this.id = id;
}
Util.extend(Player, Entity2D);

Player.HITBOX = 10;

Player.create = function(id) {
  return new Player(id);
};

Player.prototype.updateOnInput = function(keyboardState) {
  if (keyboardState.up) {
    this.vy = -100;
  } else if (keyboardState.down) {
    this.vy = 100;
  } else {
    this.vy = 0;
  }
  if (keyboardState.left) {
    this.vx = -100;
  } else if (keyboardState.right) {
    this.vx = 100;
  } else {
    this.vx = 0;
  }
};

Player.prototype.update = function() {
  this.parent.update.call(this);
};

module.exports = Player;
