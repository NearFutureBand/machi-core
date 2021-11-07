import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_ADRESS } from "../../constants";
import {
  getPlayerName,
  setGame,
  registerPlayer,
  addReport,
  getRequestToReconnect,
  setName,
  setRequestToReconnect,
} from "../../redux-toolkit/slices";

import "./styles.css";

let socket = null;

const WebsocketController = memo(() => {
  const dispatch = useDispatch();
  const playerName = useSelector(getPlayerName);
  const requestToReconnect = useSelector(getRequestToReconnect);

  const onWebsocketMessage = (message) => {
    const action = JSON.parse(message.data);
    console.log("CLIENT: message received", action);

    if (action.type === "CONNECTION") {
      localStorage.removeItem("playerId");
    }

    if (action.type === "REGISTER") {
      const playerId = localStorage.getItem("playerId");

      if (playerName !== "" && playerName === action.playerId) {
        dispatch(registerPlayer(action.game));
        localStorage.setItem("playerId", action.playerId);
      }

      if (playerName === "" && playerId === action.playerId) {
        dispatch(setName(action.playerId));
        dispatch(registerPlayer(action.game));
      }
    }

    if (action.type === "START_GAME") {
    }

    if (action.type === "PHASE_INCOME") {
      dispatch(addReport(["-----------------"]));
    }

    if (action.type === "PHASE_BUILDING") {
    }

    if (action.game) {
      dispatch(setGame(action.game));
    }
    dispatch(addReport(action.report));
  };

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = onWebsocketMessage;
  }, [onWebsocketMessage]);

  const onWebsocketOpen = () => {
    console.log('CLIENT: connected to the server');
    dispatch(addReport(["Успешно подключен к серверу"]));
    if (localStorage.getItem("playerId")) {
      socket?.send(JSON.stringify({ type: "CONNECTION", playerId: localStorage.getItem("playerId") }));
    }
  }

  const openWebsocketConnection = () => {
    if (!socket) {
      socket = new WebSocket(API_ADRESS);
      socket.onopen = onWebsocketOpen;
      socket.onmessage = onWebsocketMessage;
    }
  }

  const closeWebsocketConnection = () => {
    socket?.close();
    socket.onopen = undefined;
    socket.onmessage = undefined;
    socket = null;
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

  useEffect(() => {
    if (requestToReconnect) {
      reConnectWebscoket();
      dispatch(setRequestToReconnect(false));
    }
  }, [requestToReconnect]);

  return null;
});

const useWebsocketSend = () => {
  const sendWebsocketMessage = (type, payload) => {
    socket?.send(JSON.stringify({ type, ...payload }));
  }
  
  return sendWebsocketMessage;
}

export { WebsocketController, useWebsocketSend };