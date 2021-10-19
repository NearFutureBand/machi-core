import { memo, useMemo } from "react";

import CARDS from "../../constants/cards.json";
import { CARD_IMAGES } from "../../assets";
import { Card } from "../Card";
import "./styles.css";

const CompanyStore = memo(({ onClose }) => {

  const companies = Object.values(CARDS).filter(card => card.price !== 0);
  
  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal">
        <div className="company-store">
          {companies.map((company) => {
            return (
              <Card id={company.id} key={company.id} />
            )
          })}
        </div>
      </div>
    </div>
  )
});

export { CompanyStore };