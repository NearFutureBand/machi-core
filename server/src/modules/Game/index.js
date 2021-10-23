const { getRandomIntInclusive } = require("../../helpers");

class Game {
  constructor() {
    this.players = [];
    this.activePlayer = null;
    this.dice = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  start() {
    this.activePlayer = this.players[getRandomIntInclusive(0, this.players.length - 1)];
  }

  go() {
    // переключить активного игрока
  }
}

module.exports = Game;
