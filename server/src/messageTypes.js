module.exports = {
  REGISTER: "REGISTER", // Создание игрока; поля: name
  START_GAME: "START_GAME", // Начало игры, больше нет приема игроков и в игре появляется параметр activePlayer
  MAKE_STEP: "MAKE_STEP", // Игрок делает шаг - применяются изменения к его карточкам и кэшу
};