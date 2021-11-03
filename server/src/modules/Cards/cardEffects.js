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
  8: bakeryEffect,

  // 9

  // Кукурузное поле - 1 монета если не более 1-й достопримечательности
  10: (player) => {
    const openedSights = Object.values(player.sights).reduce(
      (count, isOpened) => (isOpened ? count + 1 : count),
      0
    );
    if (openedSights <= 1) {
      player.addMoney(1);
      return "добавлена 1 монета, так как построено не более 1 достопримечательности";
    }
  },

  //11

  // Цветник
  12: (player) => {
    player.addMoney(1);
  },
  // Цветочный магазин - по 1 монете активному игроку
  13: (player, isActive) => {
    if (!isActive) return;
    const flowerGardens = player.companies[13];
    player.addMoney(flowerGardens);
    return `добавлено ${flowerGardens} монет за ${flowerGardens} цветников`;
  },
};

module.exports = {
  CARD_EFFECTS,
};
