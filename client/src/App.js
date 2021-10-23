import { useState, useEffect, useRef, useMemo, useCallback} from "react";
import CARDS from "./constants/cards.json"; // TODO remove from FE

import { Card, CompanyStore, Registration, Lobby, Player } from "./components";
import { API_ADRESS } from "./constants";
import "./App.scss";
import { useWebsocket } from "./hooks";

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [name, setName] = useState("");
  const [game, setGame] = useState({});
  const [isStoreOpen, setIsStoreOpen] = useState(false);

  const me = useMemo(() => {
    if (!game.players) {
      return {};
    }
    return game.players.find((player) => player.name === name);
  }, [game.players, name]);

  useEffect(() => {
    if (me && !isRegistered && me.name === name) {
      setIsRegistered(true);
    }
  }, [me, isRegistered]);

  const onWebsocketMessage = (message) => {
    const action = JSON.parse(message.data);
    console.log("CLIENT: message received", action);
      
    if (action.type === "REGISTER") {
      if (action.game) {
        setGame(action.game);
      }
    }

    if (action.type === "START_GAME") {
      setIsGameStarted(true);
    }

    if (action.game) {
      setGame(action.game);
    }
  }

  const onWebsocketOpen = () => {
    console.log('CLIENT: connected to the server');
  }

  const {
    openWebsocketConnection,
    closeWebsocketConnection,
    sendWebsocketMessage,
    isConnected
  } = useWebsocket({ onOpen: onWebsocketOpen, onMessage: onWebsocketMessage });

  useEffect(() => {
    openWebsocketConnection();
    return () => {
      closeWebsocketConnection();
    }
  }, []);

  const register = (name) => {
    sendWebsocketMessage("REGISTER",  { name });
  }

  const startGame = () => {
    sendWebsocketMessage("START_GAME");
  }
  
  const activePlayerName = useMemo(() => {
    return game?.activePlayer?.name;
  }, [game?.activePlayer]);

  const amIActivePlayer = useMemo(() => {
    return activePlayerName === name;
  }, [activePlayerName, name]);

  const startStepPhaseOne = () => {
    sendWebsocketMessage("PHASE_INCOME");
  }

  const onBuyCard = (card) => {
    sendWebsocketMessage("PHASE_BUILDING", { cardId: card.id });
  }

  if (!isRegistered) {
    return (
      <Registration
        name={name}
        onChangeName={(event) => setName(event.target.value)}
        onRegistration={() => register(name)}
      />
    );
  }

  if (!isGameStarted) {
    return (
      <Lobby
        name={name}
        howManyPlayers={game?.players?.length || 0}
        onGameStart={startGame}
      />
    )
  }

  return (
    <div className="App">
      <div className="whos-turn">{amIActivePlayer ? `Ваш ход, ${activePlayerName}!` : `Ходит: ${activePlayerName}`}</div>
      {amIActivePlayer && (
        <div>
          {game.dice?.length === 0 ? (
            <button onClick={startStepPhaseOne}>Бросить кубик</button>
          ) : (
            <h3>Выпавшее число: { game.dice[0] }</h3>
          )}
          <button onClick={() => setIsStoreOpen(true)}>Купить предприятие</button>
        </div>
      )}
      <Player player={me} />
      {game.players && (
        <div>
          Другие игроки:
          {game.players.map((player) => {
            if (player.name === name) return;
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
