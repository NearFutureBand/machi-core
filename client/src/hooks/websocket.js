import { API_ADRESS } from "../constants";

let socket = null;

export const useWebsocket = ({ onOpen, onMessage }) => {

  const isConnected = Boolean(socket);

  const openWebsocketConnection = () => {
    if (!isConnected) {
      socket = new WebSocket(API_ADRESS);
      socket.onopen = onOpen;
      socket.onmessage = onMessage;
    }
  }

  const closeWebsocketConnection = () => {
    socket?.close();
  }

  const sendWebsocketMessage = (type, payload) => {
    socket?.send(JSON.stringify({ type, ...payload }));
  }

  const reConnectWebscoket = () => {
    closeWebsocketConnection();
    openWebsocketConnection();
  }

  return { openWebsocketConnection, closeWebsocketConnection, sendWebsocketMessage, reConnectWebscoket, isConnected };
}