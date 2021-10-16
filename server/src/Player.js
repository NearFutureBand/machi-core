//const cards = require("./cards.json");

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
      result[sight] = true;
      return result;
    }, {});
  }
}

module.exports = Player;
