/**
 * @fileoverview This class stores global constants between the client and
 *   server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

/**
 * Empty constructor for the Constants class.
 */
function Constants() {
  throw new Error('Constants should not be instantiated!');
}

/**
 * The world will always be a square, so there's no need for an x and y max.
 * All values are in pixels.
 */

/**
 * @const
 * @type {string}
 */
Constants.BIG_FUCKUP_ERROR = "This should not happen! Tell Alvin immediately!";

/**
 * @const
 * @type {number}
 */
Constants.WORLD_MIN = 0;

/**
 * @const
 * @type {number}
 */
Constants.WORLD_MAX = 2500;

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

/**
 * @const
 * @type {number}
 */
Constants.STATUS_IN_LOBBY = 0;

/**
 * @const
 * @type {number}
 */
Constants.STATUS_IN_ROOM = 1;

/**
 * @const
 * @type {number}
 */
Constants.STATUS_IN_GAME = 2;

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
