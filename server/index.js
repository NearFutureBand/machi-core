const { WebSocket, WebSocketServer } = require("ws");
const Player = require("./src/Player");
const Game = require("./src/Game");
const MESSAGE_TYPE = require("./src/messageTypes");
const { randomInteger } = require("./src/helpers");

const wsServer = new WebSocketServer({ port: 9000, host: "172.20.10.2" });

const game = new Game();

const clients = [];

wsServer.on("connection", (wsClient) => {
  console.log("SERVER: new client is connected");
  clients.push(wsClient);

  wsClient.on("message", (m) => {
    const message = JSON.parse(m);
    console.log("SERVER: message: ", message.type);

    if (message.type === MESSAGE_TYPE.REGISTER) {
      game.addPlayer(new Player(message.name));
    }

    if (message.type === MESSAGE_TYPE.START_GAME) {
      game.start();
    }

    if (message.type === MESSAGE_TYPE.PHASE_INCOME) {
      // сгенерить число на кубике, его положить в респонс
      // кейс если два кубика
      const number = 1; //randomInteger(1, 6);
      game.dice = [number];

      // рассчитать заработки всех игроков на основе их предприятий

      game.players.map((player) => {
        player.addIncome(number, player.name === game.activePlayer.name);
        return player;
      });
    }

    clients.forEach((client) => {
      client.send(JSON.stringify({ type: message.type, game }));
    });
  });
  // wsClient.on('close', function() {
  //     // отправка уведомления в консоль
  //     console.log('Пользователь отключился');
  //   }
});
