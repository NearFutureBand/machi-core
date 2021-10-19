import { useState, useEffect, useRef, useMemo, useCallback} from "react";
import CARDS from "./constants/cards.json"; // TODO remove from FE

import { Card } from "./components";
import { API_ADRESS } from "./constants";

const App = () => {
  const socket = useRef(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [name, setName] = useState("");
  const [game, setGame] = useState({});

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

  const onMessage = (message) => {
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

  useEffect(() => {
    console.log("socket effect");
    socket.current = new WebSocket(API_ADRESS);

    socket.current.onopen = () => {
      console.log("CLIENT: connected to server")
    }

    socket.current.onmessage = onMessage;

    return () => {
      socket.current.close();
    }
  }, []);

  console.log({ isRegistered })

  const register = (name) => {
    socket.current.send(JSON.stringify({ type: "REGISTER", name }));
  }

  const startGame = () => {
    socket.current.send(JSON.stringify({ type: "START_GAME" }));
  }
  
  console.log(game, me);
  const activePlayerName = useMemo(() => {
    return game?.activePlayer?.name;
  }, [game?.activePlayer]);

  const amIActivePlayer = useMemo(() => {
    return activePlayerName === name;
  }, [activePlayerName, name]);

  const startPhaseOne = () => {
    socket.current.send(JSON.stringify({ type: "PHASE_INCOME" }));
  }

  if (!isRegistered) {
    return (
      <div>
        Please register to start the game
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        <button onClick={() => register(name)}>Register</button>
      </div>
    ) 
  }

  if (!isGameStarted) {
    return (
      <div>
        <div>
          You ready! Now press the button below! <br />
          Players: {game?.players?.length || 1}
        </div>
        <div>
          <button onClick={startGame}>START GAME</button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {amIActivePlayer ? `Your turn, ${activePlayerName}!` : `Now ${activePlayerName}'s turn`}
      {amIActivePlayer && (
        <div>
          {game.dice?.length === 0 ? (
            <button onClick={startPhaseOne}>Бросить кубик</button>
          ) : (
            <div>Выпавшее число: { game.dice[0] }</div>
          )}
          <button>Купить предприятие</button>
        </div>
      )}
      <h4>Деньги: {me.cash}</h4>
      <div className="my-cards">
        <div className="sights">
          Достопримечательности
          {Object.keys(me.sights).map((cardId) => (
            <Card id={cardId} />
          ))}
        </div>
        <div className="companies">
          Предприятия
          {Object.keys(me.companies).map((cardId) => (
            <Card id={cardId} />
          ))}
        </div>
      </div>
      {game.players && (
        <div>
          Другие игроки:
          {game.players.map((player) => {
            if (player.name === name) return;
            return (
              <div>
                <h5>{player.name}, деньги: {player.cash}</h5>
                <div>
                  Достопримечательности
                  {Object.keys(player.sights).map((cardId) => (
                    <Card id={cardId} />
                  ))}
                </div>
                <div>
                  Предприятия
                  {Object.keys(player.companies).map((cardId) => (
                    <Card id={cardId} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default App;
