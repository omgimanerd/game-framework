/**
 * @fileoverview This is the client side script for game.html.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

$(document).ready(function() {
  var socket = io();

  var lobby = Lobby.create(socket);

  /**
   * If at any point the user's session randomly expires or disappears, the
   * server will be unable to identify the user, and will send this packet
   * to redirect the user back to the homepage.
   */
  socket.on('no-username', function(data) {
    window.alert('An error occurred! Please log in again.');
    window.location = '/logout';
  });
});
