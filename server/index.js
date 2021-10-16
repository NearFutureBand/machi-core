const WebSocket = require("ws");
const Player = require("./src/Player");
const Game = require("./src/Game");
const MESSAGE_TYPE = require("./src/messageTypes");

const wsServer = new WebSocket.Server({ port: 9000 });

const game = new Game();

wsServer.on("connection", (wsClient) => {
  console.log("SERVER: new client is connected");

  wsClient.on("message", (m) => {
    const message = JSON.parse(m);

    if (message.type === MESSAGE_TYPE.REGISTER) {
      game.addPlayer(new Player(message.name));
    }

    if (message.type === MESSAGE_TYPE.START_GAME) {
      game.start();
    }

    wsClient.send(JSON.stringify(game));
  });

  // wsClient.send('Привет');
  // wsClient.on('message', function(message) {
  //     /* обработчик сообщений от клиента */
  //   }
  // wsClient.on('close', function() {
  //     // отправка уведомления в консоль
  //     console.log('Пользователь отключился');
  //   }
});
