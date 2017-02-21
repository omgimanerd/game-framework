/**
 * @fileoverview This is a class encapsulating the client side of the game,
 *   which handles the rendering of the lobby and game and the sending of
 *   user input to the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */
/**
 * Creates a Game on the client side to render the players and entities.
 * @constructor
 * @param {Object} socket The socket connected to the server.
 * @param {Drawing} drawing The Drawing object that will render the game.
 */
function Game(socket, drawing) {
  this.socket = socket;
  this.drawing = drawing;

  this.selfPlayer = null;
  this.otherPlayers = [];
  this.animationFrameId = 0;
}

/**
 * Factory method to create a Game object.
 * @param {Object} socket The Socket connected to the server.
 * @param {Element} canvasElement The canvas element that the game will use to
 *   draw to.
 * @return {Game}
 */
Game.create = function(socket, canvasElement) {
  /**
   * Set the aspect ratio of the canvas.
   */
  canvasElement.width = 800;
  canvasElement.height = 600;
  canvasElement.style.border = '1px solid black';
  var canvasContext = canvasElement.getContext('2d');

  var drawing = Drawing.create(canvasContext);
  return new Game(socket, drawing);
};

/**
 * Initializes the Game object and its child objects as well as setting the
 * event handlers.
 */
Game.prototype.init = function() {
  var context = this;
  this.socket.on('update', function(data) {
    context.receiveGameState(data);
  });
  this.socket.emit('player-join');
};

/**
 * This method begins the animation loop for the game.
 */
Game.prototype.animate = function() {
  this.animationFrameId = window.requestAnimationFrame(
      Util.bind(this, this.update));
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
  this.selfPlayer = state['self'];
  this.otherPlayers = state['players'];
};

/**
 * Updates the state of the game client side and relays intents to the
 * server.
 */
Game.prototype.update = function() {
  if (this.selfPlayer) {
    // Emits an event for the containing the player's input.
    this.socket.emit('player-action', {
      keyboardState: {
        left: Input.LEFT,
        right: Input.RIGHT,
        up: Input.UP,
        down: Input.DOWN
      }
    });
    this.draw();
  }
  this.animate();
};

/**
 * Draws the state of the game using the internal Drawing object.
 */
Game.prototype.draw = function() {
  // Clear the canvas.
  this.drawing.clear();

  // Draw yourself
  this.drawing.drawSelf(
    this.selfPlayer.x,
    this.selfPlayer.y,
    this.selfPlayer.hitbox
  );

  // Draw the other players
  for (var player of this.otherPlayers) {
    this.drawing.drawOther(
      player.x,
      player.y,
      player.hitbox
    );
  }
};
