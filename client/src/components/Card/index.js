import { memo, useMemo } from "react";
import CARDS from "../../constants/cards.json";
import { CARD_IMAGES } from "../../assets";

import "./styles.scss";

const Card = memo(({ id, onClick }) => {

  const cardObject = CARDS[id];
  const image = CARD_IMAGES[id];
  const style = {
    backgroundImage: image ? `url(${CARD_IMAGES[id]})` : undefined,
    border: image ? undefined : "1px solid grey",
  };
  
  return (
    <div className="card" style={style} onClick={onClick}>
      {/* {image && <img className="card-image" src={image} />} */}
      {!CARD_IMAGES[id] && cardObject.name}
    </div>
  )
});

export { Card };