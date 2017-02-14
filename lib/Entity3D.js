/**
 * @fileoverview This is a wrapper class for 3D entities.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const assert = require('assert');

const DIMENSIONS = 3;

class Entity3D {

  constructor(position, velocity, acceleration, orientation, hitbox) {
    this.position = position || [0, 0, 0];
    this.velocity = velocity || [0, 0, 0];
    this.acceleration = acceleration || [0, 0, 0];

    this.lastUpdateTime = 0;
    this.deltaTime = 0;
  }

  get x() {
    return this.position[0];
  }

  set x(x) {
    this.position[0] = x;
  }

  get y() {
    return this.position[1];
  }

  set y(y) {
    this.position[1] = y;
  }

  get z() {
    return this.position[2];
  }

  set z(z) {
    this.position[2] = z;
  }

  get vx() {
    return this.velocity[0];
  }

  set vx(vx) {
    this.velocity[0] = vx;
  }

  get vy() {
    return this.velocity[1];
  }

  set vy(vy) {
    this.velocity[1] = vy;
  }

  get vz() {
    return this.velocity[2];
  }

  set vz(vz) {
    this.velocity[2] = vz;
  }

  update() {
    var currentTime = (new Date()).getTime();
    if (this.lastUpdateTime === 0) {
      this.deltaTime = 0;
    } else {
      this.deltaTime = currentTime - this.lastUpdateTime;
    }
    for (var i = 0; i < DIMENSIONS; ++i) {
      this.position[i] += this.velocity[i] * this.deltaTime;
      this.velocity[i] += this.acceleration[i] * this.deltaTime;
    }
    this.lastUpdateTime = currentTime;
  }
}

module.exports = Entity3D;
