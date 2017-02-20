/**
 * @fileoverview This class encapsulates an active game on the server and
 *   handles game updates.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const HashMap = require('hashmap');

const Util = require('../shared/Util');

class Game {

  constructor() {
    this.clients = new HashMap();
    this.players = new HashMap();
  }

  /**
   * Returns a callback function that is passed to the socket.io
   * object to handle packets sent from the client.
   */
  getSocketCallback() {
    var context = this;
    return (socket) => {
      socket.on('player-join', (data, callback) => {
        context.addNewPlayer(socket, data);
      });
    };
  }

  getClients() {
    return this.clients;
  }

  getPlayers() {
    return this.players;
  }

  _callbacks() {
    return {
      clients: Util.bind(this, this.clients),
      players: Util.bind(this, this.players)
    }
  }

  addNewPlayer(socket, data) {
    this.clients.set(socket.id, socket);
  }

  removePlayer(id) {
    this.clients.remove(id);
  }

  /**
   * Updates a player based on input received from their client.
   */
  updatePlayerOnInput(id, data) {
    this.player.get(id).update(data);
  }

  /**
   * Steps the server forward in time. Updates every entity in the game.
   */
  update() {

  }

  sendState() {
    var ids = this.clients.keys();
    for (var i = 0; i < ids.length; ++i) {
      /**
       * Send the state of the game to every client.
       */
      this.clients.emit('update', {
        self: this.players.get(ids[i]),
        players: this.players.values().filter((player) player.id != ids[i])
      });
    }
  }
}

module.exports = Game;
