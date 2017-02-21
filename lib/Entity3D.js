/**
 * @fileoverview This is a wrapper class for 3D entities.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Util = require('../shared/Util');

const DIMENSIONS = 3;

/**
 * Constructor for an Entity3D.
 * @constructor
 * @param {Array<number>} position The position of the Entity3D
 * @param {Array<number>} velocity The velocity of the Entity3D
 * @param {Array<number>} acceleration The acceleration of the Entity3D
 * @param {number} orientation The orientation of the Entity3D (radians)
 * @param {number} mass The mass of the Entity3D
 * @param {number} hitbox The radius of the Entity3D's spherical hitbox
 */
function Entity3D(position, velocity, acceleration, orientation, mass, hitbox) {
  this.position = position || [0, 0, 0];
  this.velocity = velocity || [0, 0, 0];
  this.acceleration = acceleration || [0, 0, 0];
  this.orientation = orientation || 0;
  this.mass = mass || 1;
  this.hitbox = hitbox || 0;

  this.lastUpdateTime = 0;
  this.deltaTime = 0;

  Util.splitProperties(this, ['x', 'y', 'z'], 'position');
  Util.splitProperties(this, ['vx', 'vy', 'vz'], 'velocity');
  Util.splitProperties(this, ['ax', 'ay', 'az'], 'acceleration');
}

/**
 * Applies a force to the Entity3D
 * @param {Array<number>} force The force to apply
 */
Entity3D.prototype.applyForce = function(force) {
  for (var i = 0; i < DIMENSIONS; ++i) {
    this.acceleration[i] += force[i] / this.mass;
  }
};

/**
* Returns true if this Entity3D is in contact with or intersecting another
* Entity3D.
* @param {Entity3D} other The other Entity3D to check against
* @return {boolean}
*/
Entity3D.prototype.isCollidedWith = function(other) {
  var minDistance = (this.hitbox + other.hitbox);
  return Util.getEuclideanDistance2(this._position, other.position) <
      (minDistance * minDistance);
};

/**
 * Steps this Entity3D forward in time and updates the position, velocity,
 * and acceleration.
 * @param {?number=} deltaTime An optional deltaTime to update with
 */
Entity3D.prototype.update = function(deltaTime) {
  var currentTime = (new Date()).getTime();
  if (deltaTime) {
    this.deltaTime = deltaTime;
  } else if (this.lastUpdateTime === 0) {
    this.deltaTime = 0;
  } else {
    this.deltaTime = currentTime - this.lastUpdateTime;
  }
  for (var i = 0; i < DIMENSIONS; ++i) {
    this.position[i] += this.velocity[i] * this.deltaTime;
    this.velocity[i] += this.acceleration[i] * this.deltaTime;
    this.acceleration[i] = 0;
  }
  this.lastUpdateTime = currentTime;
};

module.exports = Entity3D;
