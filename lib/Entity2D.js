/**
 * @fileoverview This is a wrapper class for 3D entities.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const assert = require('assert');
const copy = require('vectors/copy')(2);
const div = require('vectors/div')(2);
const mult = require('vectors/mult')(2);

const Util = require('../shared/Util');

const DIMENSIONS = 2;

class Entity2D {

  constructor(position, velocity, acceleration, orientation, mass, hitbox) {
    this._position = position || [0, 0];
    this._velocity = velocity || [0, 0];
    this._acceleration = acceleration || [0, 0];
    this.orientation = orientation || 0;
    this.mass = mass || 1;
    this.hitbox = hitbox || 0;

    this.lastUpdateTime = 0;
    this.deltaTime = 0;
  }

  get x() {
    return this._position[0];
  }

  set x(x) {
    this._position[0] = x;
  }

  get y() {
    return this._position[1];
  }

  set y(y) {
    this._position[1] = y;
  }

  get vx() {
    return this._velocity[0];
  }

  set vx(vx) {
    this._velocity[0] = vx;
  }

  get vy() {
    return this._velocity[1];
  }

  set vy(vy) {
    this._velocity[1] = vy;
  }

  get position() {
    return copy(this._position);
  }

  set position(position) {
    this._position = copy(position);
  }

  get velocity() {
    return copy(this._velocity);
  }

  set velocity(velocity) {
    this._velocity = copy(velocity);
  }

  get acceleration() {
    return copy(this._acceleration);
  }

  set acceleration() {
    this._acceleration = copy(this._acceleration);
  }

  applyForce(force) {
    var acceleration = div(force, this.mass);
    add(this._acceleration, acceleration);
  }

  isCollidedWith(other) {
    assert(other instanceof Entity2D);
    var minDistance = (this.hitbox + other.hitbox);
    return Util.getEuclideanDistance2(this._position, other.position) <
        (minDistance * minDistance);
  }

  update() {
    var currentTime = (new Date()).getTime();
    if (this.lastUpdateTime === 0) {
      this.deltaTime = 0;
    } else {
      this.deltaTime = currentTime - this.lastUpdateTime;
    }
    for (var i = 0; i < DIMENSIONS; ++i) {
      this._position[i] += this._velocity[i] * this.deltaTime;
      this._velocity[i] += this._acceleration[i] * this.deltaTime;
      this._acceleration[i] = 0;
    }
    this.lastUpdateTime = currentTime;
  }
}

module.exports = Entity2D;
