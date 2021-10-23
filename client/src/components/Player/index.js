import { memo, useMemo } from "react";
import CARDS from "../../constants/cards.json";
import { CARD_IMAGES } from "../../assets";
import { Card } from "../Card";

import "./styles.css";

const Player = memo(({ player }) => {

  return (
    <div className="player">
      <h3>{player.name}. Деньги: {player.cash}</h3>
      <div className="cards">
        <div className="sights">
          <span>Достопримечательности</span>
          {Object.keys(player.sights).map((cardId) => (
            <Card id={cardId} key={cardId} />
          ))}
        </div>
        <div className="companies">
          Предприятия
          {Object.entries(player.companies).map(([cardId, howMany]) => (
            <Card id={cardId} key={cardId} howMany={howMany} />
          ))}
        </div>
      </div>
    </div>
  )
});

export { Player };