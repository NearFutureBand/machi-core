const countOpenedSights = (playerSights) => {
  return Object.values(playerSights).reduce((count, isOpened) => (isOpened ? count + 1 : count), 0);
};

const isActive = (game, player) => game.activePlayer.name === player.name;

const CARD_EFFECTS = {
  // Пшеничное поле
  0: (player) => {
    player.addMoney(1);
    return "добавлена 1 монета";
  },
  // Пекарня
  1: (player, game) => {
    if (!isActive(game, player)) return;
    player.addMoney(1);
    return "добавлена 1 монета активному игроку";
  },
  // Ферма
  2: (player) => {
    player.addMoney(1);
    return "добавлена 1 монета";
  },
  // Кафе
  5: (activePlayer, anotherPlayer) => {
    const amount = 1;
    activePlayer.takeMoney(amount);
    anotherPlayer.addMoney(amount);
    return `${activePlayer.name} отдает игроку ${anotherPlayer.name} ${amount}`;
  },
  // Кредитный банк. При покупке 5 получается 5 монет. Затем в ход отдается по 2 монеты
  8: (player, game) => {
    if (!isActive(game, player)) return;
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
    return "добавлена 1 монета";
  },
  // Цветочный магазин - по 1 монете активному игроку
  13: (player, game) => {
    if (!isActive(game, player)) return;
    const flowerGardens = player.companies[13];
    player.addMoney(flowerGardens);
    return `добавлено ${flowerGardens} монет за ${flowerGardens} цветников`;
  },
  // Магазин - 3 монеты активному игроку
  16: (player, game) => {
    if (!isActive(game, player)) return;
    player.addMoney(3);
    return "добавлено 3 монеты активному игроку";
  },
  // Универсам - 2 монеты если не более 1-й достопримечательности
  18: (player, game) => {
    if (!isActive(game, player)) return;
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
  // Стадион - активный игрок берет у каждого по две монеты
  22: (player, game) => {
    if (!isActive(game, player)) {
      return;
    }
    let report = "";
    game.players.forEach((player) => {
      if (player.name !== game.activePlayer.name) {
        const amount = 2;
        player.takeMoney(amount);
        game.activePlayer.addMoney(amount);
        `${report} получено ${amount} от игрока ${player.name}`;
      }
    });
    return report;
  },
  // 23, 24 TODO требуется действие от игрока
  // 23: () => {

  // },
  // 24: () => {

  // }
};

module.exports = {
  CARD_EFFECTS,
};
