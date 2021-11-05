const addMoney = (amount) => (player) => {
  player.addMoney(amount);
};

const countOpenedSights = (playerSights) => {
  return Object.values(playerSights).reduce((count, isOpened) => (isOpened ? count + 1 : count), 0);
};

// TODO later
const isActive = () => {};

const CARD_EFFECTS = {
  0: (player) => {
    player.addMoney(1);
    return "добавлена 1 монета";
  },
  1: (player, isActive) => {
    if (!isActive) return;
    addMoney(1)(player);
    return "добавлена 1 монета активному игроку";
  },
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
  // Кредитный банк. При покупке 5 получается 5 монет. Затем в ход отдается по 2 монеты
  8: (player, isActive) => {
    if (!isActive) return;
    player.takeMoney(2);
    return "активный игрок отдает 2 монеты";
  },
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

  //11 Демонтажная
  // 11: () => {
  //   // TODO - additional user interaction is required
  // },

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
  // Магазин - 3 монеты активному игроку
  16: (player, isActive) => {
    if (!isActive) return;
    player.addMoney(3);
    return "добавлена 3 монеты активному игроку";
  },
  // Универсам - 2 монеты если не более 1-й достопримечательности
  18: (player, isActive) => {
    if (!isActive) return;
    const openedSights = countOpenedSights(player.sights);
    if (openedSights <= 1) {
      player.addMoney(2);
      return `добавлено 2 монеты активному игроку, так как построено не более 1 достопримечательности`;
    }
  },
  // Лес
  19: (player) => {
    player.addMoney(1);
    return "добавлена 1 монета";
  },
  // Суши бар. Активный игрок отдает 3 монеты если у другого человека есть суши бар и порт
  20: (activePlayer, anotherPlayer) => {
    if (!(4 in anotherPlayer.sights)) {
      return;
    }
    const amount = 3;
    activePlayer.takeMoney(amount);
    anotherPlayer.addMoney(amount);
    return `${activePlayer.name} отдает игроку ${anotherPlayer.name} ${amount}`;
  },
  // Престижный ресторан. Активный игрок отдает 5 монет, если у него 2 или более достопримечательности
  21: (activePlayer, anotherPlayer) => {
    const openedSights = countOpenedSights(activePlayer.sights);
    if (openedSights >= 2) {
      const amount = 5;
      activePlayer.takeMoney(amount);
      anotherPlayer.addMoney(amount);
      return `${activePlayer.name} отдает игроку ${anotherPlayer.name} ${amount}`;
    }
  },
};

module.exports = {
  CARD_EFFECTS,
};
