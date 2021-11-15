const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");

const { onMessage } = require("./src/modules/Messages");
const { PORT, HOST } = require("./src/constants");

const wsServer = new WebSocketServer({ port: PORT, host: HOST });
const clients = {};

wsServer.on("connection", (wsClient) => {
  const id = uuidv4();
  clients[id] = wsClient;
  console.log(`SERVER: new client is connected, id: ${id}`);

  wsClient.on("message", (m) => onMessage(m, id, wsClient, clients));

  wsClient.on("close", () => {
    console.log(`Пользователь ${id} отключился`);
    clients[id] = undefined;
  });
});
