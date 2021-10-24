const { WebSocketServer } = require("ws");
const Player = require("./src/modules/Player");
const Game = require("./src/modules/Game");
const { MESSAGE_TYPES } = require("./src/modules/Messages");
const { PORT, HOST } = require("./src/constants");

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
      const number = 2; //randomInteger(1, 6);
      game.dice = [number];

      report.push(`На кубике выпало число ${number}`);
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
      game.activePlayer.build(message.cardId);

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
