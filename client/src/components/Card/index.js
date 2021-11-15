import { memo, useMemo } from "react";
import { useSelector } from "react-redux";

import CARDS from "../../constants/cards.json";
import { CARD_IMAGES } from "../../assets";

import "./styles.scss";

const CARD_HEIGHT = 13.4;
const CARD_WIDTH = 8.9;

const Card = memo(({ id, onClick = () => {}, howMany, isOpen, fromStore }) => {
  const cardObject = CARDS[id];

  const getImage = (index) => {
    if (cardObject.type === "company") {
      if (id == 0 || id == 1) {
        return !fromStore && index === 0 ? CARD_IMAGES[id].free : CARD_IMAGES[id].paid
      }
      return CARD_IMAGES[id];
    }
    if (cardObject.type === "sight") {
      return isOpen ? CARD_IMAGES[id].open : CARD_IMAGES[id].closed;
    }
  }

  const style = {
    height: `${CARD_HEIGHT}rem`,
    width: `${CARD_WIDTH}rem`,
  };

  const addStyle = (styles, properties, condition) => {
    if (condition) {
      return { ...styles, ...properties };
    }
    return styles;
  }

  const hoverEffect = howMany === 1;
  return (
    <div>
      {new Array(howMany).fill(0).map((item, index) => {
        const image = getImage(index);
        const cardStyle = addStyle(
          addStyle(style, { marginTop: `-${CARD_HEIGHT * 0.8}rem` }, index > 0),
          {
            backgroundImage: image ? `url(${image})` : undefined,
            border: image ? undefined : "1px solid grey",
          },
          Boolean(image)
        );
        return (
          <div
            className="card"
            style={cardStyle}
            onClick = {() => onClick(cardObject)}
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