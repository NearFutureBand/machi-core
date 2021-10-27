const { WebSocketServer } = require("ws");
const Player = require("./src/modules/Player");
const Game = require("./src/modules/Game");
const { MESSAGE_TYPES } = require("./src/modules/Messages");
const { PORT, HOST } = require("./src/constants");
const { CARDS, CARD_EFFECTS } = require("./src/modules/Cards");
const { randomInteger } = require("./src/helpers");

// iphone wifi 172.20.10.2
const wsServer = new WebSocketServer({ port: PORT, host: HOST });

const game = new Game();
const clients = [];

wsServer.on("connection", (wsClient) => {
  console.log("SERVER: new client is connected");
  clients.push(wsClient);

  wsClient.on("message", (m) => {
    const message = JSON.parse(m);
    let report = [];
    console.log("SERVER: message: ", message.type);

    if (message.type === MESSAGE_TYPES.REGISTER) {
      game.addPlayer(new Player(message.name));
      report.push(`Игрок ${message.name} зарегистрировался`);
    }

    if (message.type === MESSAGE_TYPES.START_GAME) {
      game.start();
      report.push(`Игра началась`);
    }

    if (message.type === MESSAGE_TYPES.PHASE_INCOME) {
      // сгенерить число на кубике, его положить в респонс
      // кейс если два кубика
      const number = randomInteger(1, 6);
      game.dice = [number];

      report.push(`Ходит игрок ${game.activePlayer.name}. На кубике выпало число ${number}`);

      // рассчитать кто сколько кому платит по красным картам
      game.players.forEach((player) => {
        if (player.name !== game.activePlayer.name) {
          for (const companyId in player.companies) {
            if (CARDS[companyId].class === "red") {
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
        const incomeReport = player.addIncome(number, player.name === game.activePlayer.name);
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

    clients.forEach((client) => {
      client.send(JSON.stringify({ type: message.type, game, report }));
    });
  });
  // wsClient.on('close', function() {
  //     // отправка уведомления в консоль
  //     console.log('Пользователь отключился');
  //   }
});
