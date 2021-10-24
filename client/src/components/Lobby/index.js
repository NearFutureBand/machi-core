import { memo, useMemo } from "react";
import { useSelector } from "react-redux";

import { getPlayersCount } from '../../redux-toolkit/slices';
import { useWebsocketSend } from "../WebsocketController";
import "./styles.css";


const Lobby = memo(() => {
  const sendWebsocketMessage = useWebsocketSend();
  const playerName = useSelector(state => state.app.name);
  const howManyPlayers = useSelector(getPlayersCount);

  //const otherPlayersCount = Math.max(howManyPlayers - 1, 0); // TODO this is correct
  const otherPlayersCount = howManyPlayers; // TODO remove this line
  const isReadyToPlay = otherPlayersCount > 0;

  const onGameStart = () => {
    sendWebsocketMessage("START_GAME");
  }

  return (
    <div className="page">
      <div className="registration">
        <h1>Очень приятно, {playerName}</h1>
        { isReadyToPlay ? <h3>Отлично, вы готовы начинать!</h3> : <h3>Ожидаем других</h3>}
        <span>Еще игроков, готовых ворваться: {otherPlayersCount}</span>
        { isReadyToPlay && <button onClick={onGameStart}>ИГРАТЬ</button>}
      </div>
    </div>
  )
});

export { Lobby };