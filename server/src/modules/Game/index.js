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

  setNextActivePlayer() {
    const currentActivePlayerIndex = this.players.findIndex(
      (player) => player.name === this.activePlayer.name
    );
    const nextActivePlayerIndex =
      currentActivePlayerIndex === this.players.length - 1 ? 0 : currentActivePlayerIndex + 1;
    this.activePlayer = this.players[nextActivePlayerIndex];
    this.dice = [];
  }
}

module.exports = Game;
