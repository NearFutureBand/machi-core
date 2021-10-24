import { createSlice } from '@reduxjs/toolkit';

export const AppSlice = createSlice({
  name: 'app',
  initialState: {
    isConnected: false,
    isRegistered: false,
    isGameStarted: false,
    stepPhase: {}, // ??? TODO что-то для контроля фазы шага,
    name: "",
    game: {},
  },
  reducers: {
    setIsConnected: (state, action) => { state.isConnected = action.payload },
    setIsRegistered: (state, action) => { state.isRegistered = action.payload },
    setIsGameStarted: (state, action) => ({ ...state, isGameStarted: action.payload }),
    setName: (state, action) => { state.name = action.payload },
    setGame: (state, action) => {state.game = action.payload }
  },
  
});

export const getPlayerName = state => state.app.name;
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

export const { setIsConnected, setIsRegistered, setIsGameStarted, setName, setGame } = AppSlice.actions;
export const AppReducer = AppSlice.reducer;