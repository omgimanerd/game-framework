/**
 * @fileoverview This class handles the conversion of coordinates from absolute
 *   world coordinates to canvas coordinates when objects must be rendered on
 *   the canvas as the player moves around.
 * @author kennethli.3470@gmail.com (Kenneth Li)
 */

/**
 * This class manages the viewport of the client. It is mostly
 * an abstract class that handles the math of converting absolute
 * coordinates to appropriate canvas coordinates.
 * @constructor
 * @param {?Array<number>=} center The coordinates of the center of the
 *   ViewPort.
 */
function ViewPort(center) {
  this.center = center || [0, 0];
}

/**
 * This is the factory method for creating a ViewPort.
 * @return {ViewPort}
 */
ViewPort.create = function() {
  return new ViewPort();
};

/**
 * This method updates the ViewPort with the new absolute world coordinates
 * of its center.
 * @param {number} center The new coordinates of the center of the ViewPort
 */
ViewPort.prototype.setCenter = function(center) {
  this.center = center;
};

/**
 * Given an object, returns an array containing the object's converted
 * coordinates. The object must be a valid data structure sent by the
 * server with an x and y value.
 * @param {Array<number>} coords The object whose converted coords should be
 *   returned.
 * @return {Array<number>}
 */
ViewPort.prototype.toCanvasCoords = function(coords) {
  var translateX = this.center[0] - Constants.CANVAS_WIDTH / 2;
  var translateY = this.center[1] - Constants.CANVAS_HEIGHT / 2;
  return [coords[0] - translateX,
          coords[1] - translateY];
};

/**
 *
 * @param {Array<number>} coords The coords to convert
 * @return {Array<number>}
 */
ViewPort.prototype.toAbsoluteCoords = function(coords) {
  var translateX = this.center[0] - Constants.CANVAS_WIDTH / 2;
  var translateY = this.center[1] - Constants.CANVAS_HEIGHT / 2;
  return [coords[0] + translateX,
          coords[1] + translateY];
};
