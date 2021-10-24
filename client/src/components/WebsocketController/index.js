import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { API_ADRESS } from "../../constants";
import { setGame, setIsRegistered, addReport, setIsGameStarted } from "../../redux-toolkit/slices";

import "./styles.css";

let socket = null;

const WebsocketController = memo(() => {
  const dispatch = useDispatch();

  const isConnected = Boolean(socket);

  const onWebsocketMessage = (message) => {
    const action = JSON.parse(message.data);
    console.log("CLIENT: message received", action);

    if (action.type === "REGISTER") {
      if (action.game) {
        dispatch(setIsRegistered(true));
      }
    }

    if (action.type === "START_GAME") {
      dispatch(setIsGameStarted(true));
    }

    if (action.type === "PHASE_INCOME") {
      dispatch(addReport(["-----------------"]));
    }

    if (action.game) {
      dispatch(setGame(action.game));
    }
    dispatch(addReport(action.report));
  }

  const onWebsocketOpen = () => {
    console.log('CLIENT: connected to the server');
    dispatch(addReport(["Успешно подключен к серверу"]));
  }

  const openWebsocketConnection = () => {
    if (!isConnected) {
      socket = new WebSocket(API_ADRESS);
      socket.addEventListener('open', onWebsocketOpen);
      socket.addEventListener('message', onWebsocketMessage);
    }
  }

  const closeWebsocketConnection = () => {
    socket?.close();
    socket?.removeEventListener('open', onWebsocketOpen);
    socket?.removeEventListener('message', onWebsocketMessage);
  }

  const reConnectWebscoket = () => {
    closeWebsocketConnection();
    openWebsocketConnection();
  }

  useEffect(() => {
    openWebsocketConnection();
    return () => {
      closeWebsocketConnection();
    }
  }, []);
  
  return null;
});

const useWebsocketSend = () => {
  const sendWebsocketMessage = (type, payload) => {
    socket?.send(JSON.stringify({ type, ...payload }));
  }
  
  return sendWebsocketMessage;
}

export { WebsocketController, useWebsocketSend };