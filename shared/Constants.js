/**
 * @fileoverview This class stores global constants between the client and
 *   server. We're using ES5 style classes here because these classes are
 *   used on the client side as well.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

/**
 * Empty constructor for the Constants class.
 */
function Constants() {
  throw new Error('Constants should not be instantiated!');
}

/**
 * @const
 * @type {string}
 */
Constants.BIG_FUCKUP_ERROR = "This should not happen! Tell Alvin immediately!";

/**
 * @const
 * @type {number}
 */
Constants.CANVAS_WIDTH = 800;

/**
 * @const
 * @type {number}
 */
Constants.CANVAS_HEIGHT = 600;

if (typeof module === 'object') {
  /**
   * This is used if Constants is being imported as a Node module.
   */
  module.exports = Constants;
} else {
  /**
   * Otherwise, if this class is used on the client side, then just load
   * it into the window context.
   */
  window.Constants = Constants;
}
