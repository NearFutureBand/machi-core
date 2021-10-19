import { memo, useMemo } from "react";

import "./styles.css";

const Lobby = memo(({ name, howManyPlayers, onGameStart }) => {

  return (
    <div className="page">
      <div className="registration">
        <h1>Очень приятно, {name}</h1>
        <h3>Отлично, вы готовы начинать!</h3>
        <span>Еще игроков, готовых ворваться: {howManyPlayers}</span>
        <button onClick={onGameStart}>ИГРАТЬ</button>
      </div>
    </div>
  )
});

export { Lobby };