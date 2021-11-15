const jsonwebtoken = require("jsonwebtoken");
const { SERVER_SECRET } = require("../constants");

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const makeJWT = (payload) => {
  return jsonwebtoken.sign(payload, SERVER_SECRET, {
    noTimestamp: true,
  });
};

module.exports = {
  getRandomIntInclusive,
  randomInteger,
  makeJWT,
};
