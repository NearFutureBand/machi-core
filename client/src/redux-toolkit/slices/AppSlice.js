import { createSlice } from '@reduxjs/toolkit';

export const AppSlice = createSlice({
  name: 'app',
  initialState: {
    isConnected: false,
    isRegistered: false,
    isGameStarted: false,
    name: "",
    game: {},
    isPhaseIncome: false,
    isPhaseBuilding: false,
    requestToReconnect: false,
  },
  reducers: {
    setIsConnected: (state, action) => { state.isConnected = action.payload },
    registerPlayer: (state, action) => {
      if (action.payload && action.payload.players.find(player => player.name === state.name )) {
        state.isRegistered = true
      }
    },
    setIsGameStarted: (state, action) => ({ ...state, isGameStarted: action.payload }),
    setName: (state, action) => { state.name = action.payload },
    setGame: (state, action) => { state.game = action.payload },
    setIsPhaseIncome: (state, action) => { state.isPhaseIncome = action.payload },
    setIsPhaseBuilding: (state, action) => { state.isPhaseBuilding = action.payload },
    setRequestToReconnect: (state, action) => { state.requestToReconnect = action.payload },
  },
});

export const getPlayerName = state => {
  return state.app.name;
}
export const getPlayersCount = (state) => {
  return state.app.game?.players?.length || 0;
}
export const getGame = state => state.app.game;
export const getIsRegistered = state => state.app.isRegistered;
export const getMe = state => {
  const playerName = getPlayerName(state);
  const game = getGame(state);
  if (!game.players) {
    return {};
  }
  return game.players.find((player) => player.name === playerName);
}
export const getIsPhaseIncome = state => state.app.isPhaseIncome;
export const getIsPhaseBuilding = state => state.app.isPhaseBuilding;
export const getRequestToReconnect = state => state.app.requestToReconnect;

export const {
  setIsConnected,
  registerPlayer,
  setIsGameStarted,
  setName,
  setGame,
  setIsPhaseIncome,
  setIsPhaseBuilding,
  setRequestToReconnect,
} = AppSlice.actions;
export const AppReducer = AppSlice.reducer;