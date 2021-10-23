const addMoney = (amount) => (player) => {
  player.addMoney(amount);
};

const wheatFieldEffect = (player) => {
  addMoney(1)(player);
};

const bakeryEffect = (player, isActive) => {
  if (!isActive) return;
  addMoney(1)(player);
};

const CARD_EFFECTS = {
  0: (player) => player.addMoney(1),
  1: bakeryEffect,
  2: wheatFieldEffect,
};

module.exports = {
  CARD_EFFECTS,
};
