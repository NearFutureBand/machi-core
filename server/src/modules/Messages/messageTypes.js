module.exports = {
  REGISTER: "REGISTER", // Создание игрока; поля: name
  START_GAME: "START_GAME", // Начало игры, больше нет приема игроков и в игре появляется параметр activePlayer
  MAKE_STEP: "MAKE_STEP", // Игрок делает шаг - применяются изменения к его карточкам и кэшу
  PHASE_INCOME: "PHASE_INCOME", // Фронт присылает число
  PHASE_BUILDING: "PHASE_BUILDING",
};
