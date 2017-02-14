/**
 * Methods for drawing all the sprites onto the HTML5 canvas. All coordinates
 * passed the methods of the Drawing class should be canvas coordinates and not
 * absolute game coordinates. They must be passed through the ViewPort class
 * before coming into the Drawing class.
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
 * @const
 * @type {string}
 */
Drawing.BASE_IMG_URL = '/public/img/';

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
  this.context.clearRect(
      0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
};
