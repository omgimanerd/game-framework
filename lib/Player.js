/**
 * @fileoverview This is a class encapsulating a Player.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Entity2D = require('./Entity2D');

const Util = require('../shared/Util');

class Player extends Entity2D {

  constructor(position) {
    super(position, null, null, null, null, Player.HITBOX);
  }

  static create(position) {
    return new Player(position);
  }

  updateOnInput(keyboardState) {
    console.log(keyboardState);
  }

  update() {
    super.update();
  }
};

Player.HITBOX = 10;

module.exports = Player;
