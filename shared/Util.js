/**
 * @fileoverview This is a utility class containing utility methods used on the
 * server and client.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

/**
 * Empty constructor for the Util class, all functions will be static.
 */
function Util() {
  throw new Error('Util should not be instantiated!');
}

/**
 * This function takes an object and defines getter and setter methods for
 * it. This is best demonstrated with an example:
 *
 * Util.splitProperties(object, ['x', 'y'], 'position')
 * will assign object.x as the getter/setter for object['position'][0]
 * and object.y as the getter/setter for object['position'][1]
 *
 * Util.splitProperties(object, ['vx', 'vy', 'vz'], 'velocity')
 * will assign object.vx as the getter/setter for object['velocity'][0],
 * object.vy as the getter/setter for object['velocity'][1],
 * and object.vz as the getter/setter for object['velocity'][2].
 * @param {Object} object The object to apply the properties to
 * @param {Array<string>} propertyNames The property names to apply
 * @param {string} propertyFrom The property to split
 */
Util.splitProperties = function(object, propertyNames, propertyFrom) {
  for (var i = 0; i < propertyNames.length; ++i) {
    (function(j) {
      Object.defineProperty(object, propertyNames[j], {
        enumerable: true,
        configurable: true,
        get: function() {
          return this[propertyFrom][j];
        },
        set: function(property) {
          this[propertyFrom][j] = property;
        }
      });
    })(i);
  }
};

/**
 * Allows for ES5 class inheritance by implementing functionality for a
 * child class to inherit from a parent class.
 * @param {Object} child The child object that inherits the parent
 * @param {Object} parent The parent object to inherit from
 */
Util.extend = function (child, parent) {
  child.prototype = Object.create(parent);
  child.prototype.parent = parent.prototype;
};

/**
 * Binds a function to a context, useful for assigning event handlers and
 * function callbacks.
 * @param {Object} context The context to assign the method to.
 * @param {function(?)} method The method to bind the context to.
 * @return {function(?)}
 */
Util.bind = function(context, method) {
  return function() {
    return method.apply(context, arguments);
  }
};

/**
 * This method returns the sign of a number.
 * @param {number} x The number to check.
 * @return {number}
 */
Util.getSign = function(x) {
  if (x > 0) {
    return 1;
  } else if (x < 0) {
    return -1;
  }
  return 0;
};

/**
 * This method linearly scales a number from one range to another.
 * @param {number} x The number to scale.
 * @param {number} a1 The lower bound of the range to scale from.
 * @param {number} a2 The upper bound of the range to scale from.
 * @param {number} b1 The lower bound of the range to scale to.
 * @param {number} b2 The upper bound of the range to scale to.
 * @return {number}
 */
Util.linearScale = function(x, a1, a2, b1, b2) {
  return ((x - a1) * (b2 - b1) / (a2 - a1)) + b1;
};

/**
 * Returns the sum of all the elements in an array.
 * @param {Array<number>} array An array to sum.
 * @return {number}
 */
Util.sum = function(array) {
  return array.reduce((total, value) =>  total + value);
}

/**
 * Returns the Manhattan Distance between two points.
 * @param {Array<number>} p1 The first point.
 * @param {Array<number>} p2 The second point.
 * @return {number}
 */
Util.getManhattanDistance = function(p1, p2) {
  if (p1.length != p2.length) {
    throw new Error(`Cannot compute distance between ${p1} and ${p2}`);
  }
  return Util.sum(p1.map((value, index) => {
    return Math.abs(value - p2[index]);
  }));
};

/**
 * Returns the squared Euclidean distance between two points.
 * @param {Array<number>} p1 The first point.
 * @param {Array<number>} p2 The second point.
 * @return {number}
 */
Util.getEuclideanDistance2 = function(p1, p2) {
  if (p1.length != p2.length) {
    throw new Error(`Cannot compute distance between ${p1} and ${p2}`);
  }
  return Util.sum(p1.map((value, index) => {
    return (value - p2[index]) * (value - p2[index]);
  }));
};

/**
 * Returns the true Euclidean distance between two points.
 * @param {Array<number>} p1 The first point.
 * @param {Array<number>} p2 The second point.
 * @return {number}
 */
Util.getEuclideanDistance = function(p1, p2) {
  return Math.sqrt(Util.getEuclideanDistance2(p1, p2));
};

/**
 * Given a value, a minimum, and a maximum, returns true if value is
 * between the minimum and maximum, inclusive of both bounds. This
 * functio will still work if min and max are switched.
 * @param {number} val The value to check.
 * @param {number} min The minimum bound.
 * @param {number} max The maximum bound.
 * @return {boolean}
 */
Util.inBound = function(val, min, max) {
  if (min > max) {
    return val >= max && val <= min;
  }
  return val >= min && val <= max;
};

/**
 * Bounds a number to the given minimum and maximum, inclusive of both
 * bounds. This function will still work if min and max are switched.
 * @param {number} val The value to check.
 * @param {number} min The minimum number to bound to.
 * @param {number} max The maximum number to bound to.
 * @return {number}
 */
Util.bound = function(val, min, max) {
  if (min > max) {
    return Math.min(Math.max(val, max), min);
  }
  return Math.min(Math.max(val, min), max);
};

/**
 * Returns a random floating-point number between the given min and max
 * values, exclusive of the max value.
 * @param {number} min The minimum number to generate.
 * @param {number} max The maximum number to generate.
 * @return {number}
 */
Util.randRange = function(min, max) {
  if (min >= max) {
    var swap = min;
    min = max;
    max = swap;
  }
  return (Math.random() * (max - min)) + min;
};

/**
 * Returns a random integer between the given min and max values, exclusive
 * of the max value.
 * @param {number} min The minimum number to generate.
 * @param {number} max The maximum number to generate.
 * @return {number}
 */
Util.randRangeInt = function(min, max) {
  if (min >= max) {
    var swap = min;
    min = max;
    max = swap;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Returns a random element in a given array.
 * @param {Array<*>} array The array from which to select a random
 *   element from.
 * @return {*}
 */
Util.choiceArray = function(array) {
  return array[Util.randRangeInt(0, array.length)];
};

if (typeof module === 'object') {
  module.exports = Util;
} else {
  window.Util = Util;
}
