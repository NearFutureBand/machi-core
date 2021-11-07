import { useState, useEffect, useRef, useMemo, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";

import { CompanyStore, Player, useWebsocketSend } from "./components";
import "./App.scss";
import {
  addReport,
  getGame,
  getIsRegistered,
  getMe,
  getPlayerName,
} from "./redux-toolkit/slices";


const App = () => {
  const dispatch = useDispatch();
  const sendWebsocketMessage = useWebsocketSend();
  const game = useSelector(getGame);
  const me = useSelector(getMe);
  const playerName = useSelector(getPlayerName);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  
  const activePlayerName = useMemo(() => {
    return game?.activePlayer?.name;
  }, [game]);

  const amIActivePlayer = useMemo(() => {
    return activePlayerName === playerName;
  }, [activePlayerName, playerName]);

  const startStepPhaseOne = () => {
    sendWebsocketMessage("PHASE_INCOME");
  }

  const onBuyCard = (card) => {
    sendWebsocketMessage("PHASE_BUILDING", { cardId: card.id });
  }

  return (
    <div className="App">
      <div className="whos-turn">{amIActivePlayer ? `Ваш ход, ${activePlayerName}!` : `Ходит: ${activePlayerName}`}</div>
      {amIActivePlayer && (
        <div>
          {game.status === "AWAITING_DICE" && (
            <button onClick={startStepPhaseOne}>Бросить кубик</button>
          )}
          {game.status === "AWAITING_BUILDING" && (
            <>
              <h3>Выпавшее число: {game.dice[0]}</h3>
              <button onClick={() => setIsStoreOpen(true)}>Купить предприятие</button>
            </>
          )}
        </div>
      )}
      <Player player={me} />
      {game.players && (
        <div>
          Другие игроки:
          {game.players.map((player) => {
            if (player.name === playerName) return;
            return (
              <Player player={player} />
            )
          })}
        </div>
      )}
      {isStoreOpen && (
        <CompanyStore onClose={() => setIsStoreOpen(false)} onBuyCard={onBuyCard} />
      )}
    </div>
  );
}

export default App;
