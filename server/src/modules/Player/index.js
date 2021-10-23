const { CARDS, CARD_EFFECTS } = require("../Cards");

const DEFAULT_COMPANIES = [0, 1];
const DEFAULT_SIGHTS = [3];

class Player {
  constructor(name) {
    this.name = name;
    this.cash = 3;
    this.sights = this._prepareDefaultSights();
    this.companies = this._prepareDefaultCompanies();
  }

  _prepareDefaultSights() {
    return DEFAULT_SIGHTS.reduce((result, sight) => {
      result[sight] = true;
      return result;
    }, {});
  }

  _prepareDefaultCompanies() {
    return DEFAULT_COMPANIES.reduce((result, sight) => {
      result[sight] = 1;
      return result;
    }, {});
  }

  addMoney(amount) {
    this.cash += amount;
  }

  addIncome(diceNumber, hisTurn) {
    for (const companyId in this.companies) {
      if (CARDS[companyId].effectOn.some((item) => item === diceNumber)) {
        CARD_EFFECTS[companyId](this, hisTurn);
      }
    }
  }
}

module.exports = Player;
