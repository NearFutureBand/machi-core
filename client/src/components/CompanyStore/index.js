import { memo, useState } from "react";

import CARDS from "../../constants/cards.json";
import { Card } from "../Card";
import { Modal } from "../Modal";
import "./styles.scss";

const CompanyStore = memo(({ onClose, onBuyCard }) => {

  const companies = Object.values(CARDS).filter(card => card.type === "company" && !card.default);
  const [selectedCard, setSelectedCard] = useState(null);

  const closeConfirmModal = () => {
    setSelectedCard(null);
  }

  const onConfirmPurchase = () => {
    onBuyCard(selectedCard)
    closeConfirmModal();
    onClose();
  }

  return (
    <>
      <Modal onClose={onClose} size="huge">
        <div className="company-store">
          {companies.map((company) => {
            return (
              <Card id={company.id} key={company.id} onClick={(card) => setSelectedCard(card)}/>
            )
          })}
        </div>
      </Modal>
      {selectedCard && (
        <Modal hideCloseButtons layer={2}>
          <div className="confirm-company-purchase">
            <h3>Купить предприятие {selectedCard.name}?</h3>
            <div className="buttons">
              <button onClick={onConfirmPurchase}>Купить</button>
              <button onClick={closeConfirmModal}>Отмена</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
});

export { CompanyStore };