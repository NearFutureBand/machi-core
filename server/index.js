const { WebSocket, WebSocketServer } = require("ws");
const Player = require("./src/Player");
const Game = require("./src/Game");
const MESSAGE_TYPE = require("./src/messageTypes");

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

    clients.forEach((client) => {
      console.log(client.url);
      client.send(JSON.stringify({ type: message.type, game }));
    });
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
