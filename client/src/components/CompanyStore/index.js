import { memo, useState } from "react";
import { useSelector } from "react-redux";

import CARDS from "../../constants/cards.json";
import { Card } from "../Card";
import { Modal } from "../Modal";
import { getMe } from "../../redux-toolkit/slices";
import "./styles.scss";

const CompanyStore = memo(({ onClose, onBuyCard }) => {

  const me = useSelector(getMe);
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
              <Card id={company.id} key={company.id} onClick={(card) => setSelectedCard(card)} fromStore />
            )
          })}
        </div>
      </Modal>
      {selectedCard && (
        <Modal hideCloseButtons layer={2}>
          <div className="confirm-company-purchase">
            {me.cash < selectedCard.price ? (
              <>
                <h3>Недостаточно средств чтобы купить {selectedCard.name}</h3>
                <div className="buttons">
                  <button onClick={closeConfirmModal}>Эх</button>
                </div>
              </>
            ) : (
              <>
                <h3>Купить предприятие {selectedCard.name} за {selectedCard.price}?</h3>
                <div className="buttons">
                  <button onClick={onConfirmPurchase}>Купить</button>
                  <button onClick={closeConfirmModal}>Отмена</button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  )
});

export { CompanyStore };