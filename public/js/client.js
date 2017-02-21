/**
 * @fileoverview Client side script
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

$(document).ready(function() {
  var socket = io();
  var canvas = document.getElementById('canvas');

  Input.applyEventHandlers();
  Input.addMouseTracker(canvas);

  var game = Game.create(socket, canvas);
  game.init();
  game.animate();
});
