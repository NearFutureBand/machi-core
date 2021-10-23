const CARDS = require("./cards.json");
const { CARD_EFFECTS } = require("./cardEffects");

const CARD_MAP = {
  wheatFieldFree: 0,
  bakeryFree: 1,
  farm: 2,
  townHall: 3,
};

const getCardByName = (name) => CARDS[CARD_MAP[name]];

module.exports = {
  CARDS,
  CARD_EFFECTS,
  getCardByName,
};
