const WebSocket = require("ws");

const wsServer = new WebSocket.Server({ port: 9000 });

wsServer.on("connection", (wsClient) => {
  console.log("Новый пользователь");

  //   wsClient.send('Привет');
  // wsClient.on('message', function(message) {
  //     /* обработчик сообщений от клиента */
  //   }
  // wsClient.on('close', function() {
  //     // отправка уведомления в консоль
  //     console.log('Пользователь отключился');
  //   }
});

function onConnect(wsClient) {}
