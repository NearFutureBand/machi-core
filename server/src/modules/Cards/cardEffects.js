const addMoney = (amount) => (player) => {
  player.addMoney(amount);
};

const bakeryEffect = (player, isActive) => {
  if (!isActive) return;
  addMoney(1)(player);
  return "добавлена 1 монета активному игроку";
};

const CARD_EFFECTS = {
  0: (player) => {
    player.addMoney(1);
    return "добавлена 1 монета";
  },
  1: bakeryEffect,
  2: (player) => {
    player.addMoney(1);
    return "добавлена 1 монета";
  },
  5: (activePlayer, anotherPlayer) => {
    const amount = 1;
    activePlayer.takeMoney(amount);
    anotherPlayer.addMoney(amount);
    return `${activePlayer.name} отдает игроку ${anotherPlayer.name} ${amount}`;
  },
};

module.exports = {
  CARD_EFFECTS,
};
