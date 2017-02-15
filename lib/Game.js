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

  updatePlayerOnInput(id, data) {
    this.player.get(id).update(data);
  }

  update() {

  }

  sendState() {
    var ids = this.clients.keys();
    for (var i = 0; i < ids.length; ++i) {
      this.clients.emit('update', {
        self: this.players.get(ids[i]),
        players: this.players.values().filter((player) player.id != ids[i])
      });
    }
  }
}

module.exports = Game;
