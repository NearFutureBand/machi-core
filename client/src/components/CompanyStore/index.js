import { memo, useMemo } from "react";

import CARDS from "../../constants/cards.json";
import { CARD_IMAGES } from "../../assets";
import { Card } from "../Card";
import "./styles.scss";

const CompanyStore = memo(({ onClose }) => {

  const companies = Object.values(CARDS).filter(card => card.price !== 0);
  
  return (
    <div className="modal-background">
      <div className="modal">
        <button className="button-close" onClick={onClose}>X</button>
        <div className="company-store">
          {companies.map((company) => {
            return (
              <Card id={company.id} key={company.id} />
            )
          })}
          
        </div>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  )
});

export { CompanyStore };