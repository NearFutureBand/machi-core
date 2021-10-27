import { useEffect } from "react";
import { API_ADRESS } from "../constants";

let socket = null;

export const useWebsocket = ({ onOpen, onMessage }) => {

  const isConnected = Boolean(socket);

  const openWebsocketConnection = () => {
    if (!isConnected) {
      socket = new WebSocket(API_ADRESS);
      socket.onopen = onOpen;
      socket.addEventListener('message', onMessage);
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

export const useWebsocketMessanger = (responseHandler, type) => {
  useEffect(() => {
    socket.addEventListener('message', responseHandler);
    // ????
  }, []);

  const sendWebsocketMessage = (payload) => {
    socket?.send(JSON.stringify({ type, ...payload }));
  }
  
  return sendWebsocketMessage;
}