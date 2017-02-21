/**
 * @fileoverview Class handling the drawing of objects in the game.
 * @author kennethli.3470@gmail.com (Kenneth Li)
 */

/**
 * Creates a Drawing object.
 * @param {CanvasRenderingContext2D} context The context this object will
 *   draw to.
 * @constructor
 */
function Drawing(context) {
  this.context = context;
}

/**
 * This is a factory method for creating a Drawing object.
 * @param {CanvasRenderingContext2D} context The context this object will
 *   draw to.
 * @return {Drawing}
 */
Drawing.create = function(context) {
  return new Drawing(context);
};

/**
 * This method creates and returns an Image object.
 * @param {string} src The path to the image
 * @param {number} width The width of the image in pixels
 * @param {number} height The height of the image in pixels
 * @return {Image}
 */
Drawing.createImage = function(src, width, height) {
  var image = new Image(width, height);
  image.src = src;
  return image;
};

/**
 * Clears the canvas context.
 */
Drawing.prototype.clear = function() {
  var canvas = this.context.canvas;
  this.context.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * Example draw function.
 */
// Drawing.prototype.drawPlayer = function(x, y, size) {
//   this.context.save();
//   this.context.translate(x, y);
//   this.context.drawImage(this.images['player'], -size / 2, -size / 2, size, size);
//   this.context.restore();
// };
