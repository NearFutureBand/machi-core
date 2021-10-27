import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CARDS from "../../constants/cards.json";
import { CARD_IMAGES } from "../../assets";
import { Card } from "../Card";
import { Modal } from "../Modal";
import { getIsPhaseBuilding } from "../../redux-toolkit/slices";
import { useWebsocketSend } from "../WebsocketController";

import "./styles.css";

const Player = memo(({ player }) => {
  const sendWebsocketMessage = useWebsocketSend();
  const isPhaseBuilding = useSelector(getIsPhaseBuilding);
  const [selectedSight, setSelectedSight] = useState(null);

  if (!player.name) {
    return null;
  }

  const onSightClick = (card) => {
    if (isPhaseBuilding) {
      setSelectedSight(card);
    }
  }

  const onConfirmBuilding = () => {
    sendWebsocketMessage("PHASE_BUILDING", { cardId: selectedSight.id });
  }

  return (
    <div className="player">
      <h3>{player.name}. Деньги: {player.cash}</h3>
      <div className="cards">
        <div className="sights">
          <span>Достопримечательности</span>
          {Object.entries(player.sights).map(([cardId, isOpen]) => (
            <Card id={cardId} key={cardId} isOpen={isOpen} onClick={onSightClick}/>
          ))}
        </div>
        <div className="companies">
          Предприятия
          {Object.entries(player.companies).map(([cardId, howMany]) => (
            <Card id={cardId} key={cardId} howMany={howMany} />
          ))}
        </div>
      </div>

      {selectedSight && (
        <Modal hideCloseButtons layer={2}>
          <div className="confirm-company-purchase">
            <h3>Построить достопримечательность {selectedSight.name}?</h3>
            <div className="buttons">
              <button onClick={onConfirmBuilding}>Да</button>
              <button onClick={() => setSelectedSight(null)}>Нет</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
});

export { Player };