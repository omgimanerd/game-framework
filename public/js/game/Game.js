/**
 * @fileoverview This is a class encapsulating the client side of the game,
 *   which handles the rendering of the lobby and game and the sending of
 *   user input to the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */
/**
 * Creates a Game on the client side to render the players and entities as
 * well as the player UI.
 * @constructor
 * @param {Object} socket The socket connected to the server.
 * @param {Input} inputHandler The Input object that will track user input.
 * @param {Drawing} drawing The Drawing object that will render the game.
 * @param {ViewPort} viewPort The ViewPort object that will manage the player's
 *   current view.
 */
function Game(socket, inputHandler, drawing, viewPort) {
  this.socket = socket;

  this.inputHandler = inputHandler;
  this.drawing = drawing;
  this.viewPort = viewPort;

  this.selfPlayer = null;
  this.otherPlayers = [];

  this.animationFrameId = 0;
}

/**
 * Factory method to create a Game object.
 * @param {Object} socket The Socket connected to the server.
 * @param {Element} lobbyElement The element that the game lobby will be
 *   rendered in.
 * @param {Element} canvasElement The canvas element that the game will use to
 *   draw to.
 * @return {Game}
 */
Game.create = function(socket, lobbyElement, canvasElement) {
  canvasElement.width = Constants.CANVAS_WIDTH;
  canvasElement.height = Constants.CANVAS_HEIGHT;
  var canvasContext = canvasElement.getContext('2d');

  var inputHandler = Input.create(canvasElement);
  var drawing = Drawing.create(canvasContext);
  var viewPort = ViewPort.create();
  return new Game(socket, inputHandler, drawing, viewPort);
};

/**
 * Initializes the Game object and its child objects as well as setting the
 * event handlers.
 */
Game.prototype.init = function() {
  this.socket.on('update', bind(this, function(data) {
    this.receiveGameState(data);
  }));
};

/**
 * This method begins the animation loop for the game.
 */
Game.prototype.animate = function() {
  this.animationFrameId = window.requestAnimationFrame(
      bind(this, this.update));
};

/**
 * This method stops the animation loop for the game.
 */
Game.prototype.stopAnimation = function() {
  window.cancelAnimationFrame(this.animationFrameId);
};

/**
 * Updates the game's internal storage of all the powerups, called each time
 * the server sends packets.
 * @param {Object} state The game state received from the server.
 */
Game.prototype.receiveGameState = function(state) {
  this.self = state['self'];
  this.players = state['players'];
};

/**
 * Updates the state of the game client side and relays intents to the
 * server.
 */
Game.prototype.update = function() {
  if (this.self) {
    // Emits an event for the containing the player's intention to the server.
    var packet = {
      keyboardState: {
      }
    };
    this.socket.emit('player-action', packet);
  }

  this.draw();

  this.animate();
};

/**
 * Draws the state of the game using the internal Drawing object.
 */
Game.prototype.draw = function() {
  // Clear the canvas.
  this.drawing.clear();

};
