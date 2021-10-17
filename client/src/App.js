import { useState, useEffect, useRef, useCallback, useMemo} from "react";
import CARDS from "../src/cards.json";

const App = () => {

  const socket = useRef(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [name, setName] = useState("Roman");
  const [game, setGame] = useState({});

  useEffect(() => {
    socket.current = new WebSocket("ws://172.20.10.2:9000");

    socket.current.onopen = () => {
      console.log("CLIENT: connected to server")
    }

    socket.current.onmessage = onMessage;

    return () => {
      socket.current.close();
    }
  }, []);

  const onMessage = useCallback((message) => {
    const action = JSON.parse(message.data);
    console.log("CLIENT: message received", action);
      
    if (action.type === "REGISTER") {
      if (action.game) {
        setIsRegistered(true);
      }
    }

    if (action.type === "START_GAME") {
      if (action.game) {
        setGame(action.game);
        setIsGameStarted(true);
      }
    }
  }, []);

  const register = (name) => {
    socket.current.send(JSON.stringify({ type: "REGISTER", name }));
  }

  const startGame = () => {
    socket.current.send(JSON.stringify({ type: "START_GAME" }));
  }

  const me = useMemo(() => {
    if (!game.players) {
      return {};
    }
    return game.players.find((player) => player.name === name);
  }, [game.players, name]);
  
  console.log(game, me);
  const activePlayerName = useMemo(() => {
    return game?.activePlayer?.name;
  }, [game?.activePlayer]);

  const amIActivePlayer = useMemo(() => {
    return activePlayerName === name;
  }, [activePlayerName, name]);

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
        You ready! Now press the button below!
        <button onClick={startGame}>START GAME</button>
      </div>
    )
  }

  return (
    <div className="App">
      {amIActivePlayer ? `Your turn, ${activePlayerName}!` : `Now ${activePlayerName}'s turn`}
      {amIActivePlayer && (
        <div>
          <button>Бросить кубик</button>
          <button>Купить предприятие</button>
        </div>
      )}
      <h4>Деньги: {me.cash}</h4>
      <div className="my-cards">
        <div className="sights">
          Достопримечательности
          {Object.keys(me.sights).map((cardId) => (
            <div className="card">
              {CARDS[cardId].name}
            </div>
          ))}
        </div>
        <div className="companies">
          Предприятия
          {Object.keys(me.companies).map((cardId) => (
            <div className="card">
              {CARDS[cardId].name}
            </div>
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
                    <div className="card card-smaller">
                      {CARDS[cardId].name}
                    </div>
                  ))}
                </div>
                <div>
                  Предприятия
                  {Object.keys(player.companies).map((cardId) => (
                    <div className="card card-smaller">
                      {CARDS[cardId].name}
                    </div>
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
