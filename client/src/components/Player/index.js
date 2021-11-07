import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "../Card";
import { Modal } from "../Modal";
import { getIsPhaseBuilding } from "../../redux-toolkit/slices";
import { useWebsocketSend } from "../WebsocketController";
import { sortCompaniesForPlayer } from "../../helpers";

import "./styles.scss";
import CARDS from "../../constants/cards.json";

const Player = memo(({ player }) => {
  const sendWebsocketMessage = useWebsocketSend();
  const isPhaseBuilding = useSelector(getIsPhaseBuilding);
  const [selectedSight, setSelectedSight] = useState(null);

  if (!player.name) {
    return null;
  }

  const onSightClick = (card) => {
    if (isPhaseBuilding && !player.sights[card.id] && player.cash >= CARDS[card.id].price) {
      setSelectedSight(card);
    }
  }

  const onConfirmBuilding = () => {
    sendWebsocketMessage("PHASE_BUILDING", { cardId: selectedSight.id });
  }

  const sights = Object.entries(player.sights).map(([cardId, isOpen]) => ({
    cardId,
    isOpen
  })).sort((a, b) => {
    if (CARDS[a.cardId].price > CARDS[b.cardId].price) {
      return 1;
    }
    if (CARDS[a.cardId].price < CARDS[b.cardId].price) {
      return -1;
    }
    return 0;
  });

  const companies = sortCompaniesForPlayer(player.companies);

  return (
    <div className="player">
      <h3>{player.name}. Деньги: {player.cash}</h3>
      <div className="cards">
        <div className="sights">
          <h4>Достопримечательности</h4>
          <div>
            {sights.map(({ cardId, isOpen }) => (
              <Card id={cardId} key={cardId} isOpen={isOpen} onClick={onSightClick}/>
            ))}
          </div>
        </div>
        <div className="companies">
          <h4>Предприятия</h4>
          <div>
          {companies.map((company) => (
            <Card id={company.id} key={company.id} howMany={company.howMany} />
          ))}
          </div>
        </div>
      </div>

      {isPhaseBuilding && selectedSight && (
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