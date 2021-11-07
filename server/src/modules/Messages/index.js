const MESSAGE_TYPES = require("./messageTypes");
const Player = require("../Player");
const Game = require("../Game");
const { randomInteger } = require("../../helpers");
const { CARDS, CARD_EFFECTS } = require("../Cards");

const game = new Game();

const names = {};

const onMessage = (m, clientId, wsClient, clients) => {
  const message = JSON.parse(m);
  let messageType = message.type;
  let report = [];
  console.log("SERVER: message: ", messageType);

  if (message.type === MESSAGE_TYPES.CONNECTION) {
    console.log(message.playerId);
    const player = game.players.find((player) => player.name === message.playerId);
    if (!player) {
      console.log("Невозможно переподключиться");
      return;
    }

    names[player.name] = clientId;
    report.push(`Игрок ${player.name} переподключился`);
    messageType = MESSAGE_TYPES.REGISTER; // TODO register???
  }

  if (message.type === MESSAGE_TYPES.REGISTER) {
    game.addPlayer(new Player(message.name));
    names[message.name] = clientId;
    report.push(`Игрок ${message.name} зарегистрировался`);
  }

  if (message.type === MESSAGE_TYPES.START_GAME) {
    game.start();
    report.push(`Игра началась`);
  }

  if (message.type === MESSAGE_TYPES.PHASE_INCOME) {
    const number = randomInteger(1, 6);
    game.dice = [number];

    report.push(`Ходит игрок ${game.activePlayer.name}. На кубике выпало число ${number}`);

    // рассчитать кто сколько кому платит по красным картам
    game.players.forEach((player) => {
      if (player.name !== game.activePlayer.name) {
        for (const companyId in player.companies) {
          if (
            CARDS[companyId].class === "red" &&
            CARDS[companyId].effectOn.some((item) => item === number)
          ) {
            const suchCompanyCount = player.companies[companyId];
            for (let i = 0; i < suchCompanyCount; i++) {
              report.push(CARD_EFFECTS[companyId](game.activePlayer, player));
            }
          }
        }
      }
    });

    // рассчитать заработки всех игроков на основе их предприятий
    game.players.map((player) => {
      const incomeReport = player.addIncome(number, game);
      report = [...report, ...incomeReport];
      return player;
    });
  }

  if (message.type === MESSAGE_TYPES.PHASE_BUILDING) {
    // TODO: проверка возможно ли купить (здесь, можно создать метод в классе Player)

    // добавляем id карты в нужный объект
    const buildingReport = game.activePlayer.build(message.cardId);
    report.push(buildingReport);
    // переключить activePlayer
    game.setNextActivePlayer();
  }
  console.log(names);
  for (const clientKey in clients) {
    console.log(clientKey, Boolean(clients[clientKey]));
  }
  Object.values(names).forEach((playerKey) => {
    if (clients[playerKey]) {
      clients[playerKey].send(
        JSON.stringify({
          type: messageType,
          game,
          report,
          playerId: message.name || message.playerId,
        })
      );
    }
  });
};

module.exports = {
  MESSAGE_TYPES,
  onMessage,
};
