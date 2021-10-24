import { memo, useMemo } from "react";
import CARDS from "../../constants/cards.json";
import { CARD_IMAGES } from "../../assets";

import "./styles.scss";

const CARD_HEIGHT = 13.4;
const CARD_WIDTH = 8.9;

const Card = memo(({ id, onClick, howMany, isOpen }) => {

  const cardObject = CARDS[id];
  const image = cardObject.type === "company" ? CARD_IMAGES[id] : (isOpen ? CARD_IMAGES[id].open : CARD_IMAGES[id].closed);
  const style = {
    backgroundImage: image ? `url(${image})` : undefined,
    border: image ? undefined : "1px solid grey",
    height: `${CARD_HEIGHT}rem`,
    width: `${CARD_WIDTH}rem`,
  };

  const hoverEffect = howMany === 1;
  
  return (
    <div>
      {new Array(howMany).fill(0).map((item, index) => {
        const cardStyle = index > 0 ? { ...style, marginTop: `-${CARD_HEIGHT * 0.8}rem` } : style;
        return (
          <div
            className="card"
            style={cardStyle}
            onClick = { onClick }
            key = { index }
          >
            {!CARD_IMAGES[id] && cardObject.name}
          </div>
        )
      })}
    </div>
  )
});

export { Card };