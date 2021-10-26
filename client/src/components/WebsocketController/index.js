import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_ADRESS } from "../../constants";
import {
  getPlayerName,
  setGame,
  registerPlayer,
  addReport,
  setIsGameStarted,
  setIsPhaseIncome,
  setIsPhaseBuilding,
} from "../../redux-toolkit/slices";

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
        dispatch(registerPlayer(action.game));
      }
    }

    if (action.type === "START_GAME") {
      dispatch(setIsGameStarted(true));
      dispatch(setIsPhaseIncome(true));
    }

    if (action.type === "PHASE_INCOME") {
      dispatch(addReport(["-----------------"]));
      dispatch(setIsPhaseIncome(false));
      dispatch(setIsPhaseBuilding(true));
    }

    if (action.type === "PHASE_BUILDING") {
      dispatch(setIsPhaseIncome(true));
      dispatch(setIsPhaseBuilding(false));
    }

    if (action.game) {
      dispatch(setGame(action.game));
    }
    dispatch(addReport(action.report));
  };

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