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
function Drawing(context, images) {
  this.context = context;
  this.images = images;
}

/**
 * @const
 * @type {string}
 */
Drawing.BASE_URL = '/public/img/';

/**
 * Example:
 * Drawing.SRCS = {
 *   background: 'background.png',
 *   player: 'player.png'
 * };
 */
Drawing.SRCS = {};

/**
 * This is a factory method for creating a Drawing object.
 * @param {CanvasRenderingContext2D} context The context this object will
 *   draw to.
 * @return {Drawing}
 */
Drawing.create = function(context) {
  var images = {};
  for (var key in Drawing.SRCS) {
    if (typeof(Drawing.SRCS[key]) === 'string') {
      images[key] = Drawing.createImage(Drawing.BASE_URL + Drawing.SRCS[key]);
    } else {
      images[key] = Drawing.SRCS[key].map((src) => {
        return Drawing.createImage(Drawing.BASE_URL + src);
      });
    }
  }
  return new Drawing(context, images);
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
  this.context.clearRect(0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
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
