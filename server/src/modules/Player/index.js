const { CARDS, CARD_EFFECTS } = require("../Cards");

const DEFAULT_COMPANIES = [0, 1];
const DEFAULT_SIGHTS = [3, 4];

class Player {
  constructor(name) {
    this.name = name;
    this.cash = 3;
    this.sights = this._prepareDefaultSights();
    this.companies = this._prepareDefaultCompanies();
  }

  _prepareDefaultSights() {
    return DEFAULT_SIGHTS.reduce((result, sight) => {
      result[sight] = sight === 3; // TODO только ратуша построена по умолчанию
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
    const incomeReport = [];
    console.log(this);
    for (const companyId in this.companies) {
      if (CARDS[companyId].effectOn.some((item) => item === diceNumber)) {
        const suchCompanyCount = this.companies[companyId];
        for (let i = 0; i < suchCompanyCount; i++) {
          const report = CARD_EFFECTS[companyId](this, hisTurn);
          if (report) {
            incomeReport.push(`${this.name}: ${CARDS[companyId].name}: ${report}`);
          }
        }
      }
    }
    return incomeReport;
  }

  build(cardId) {
    let report = "";
    const card = CARDS[cardId];
    this.cash -= card.price;

    if (card.type === "company") {
      if (cardId in this.companies) {
        this.companies[cardId] = this.companies[cardId] + 1;
        report = `${this.name} покупает еще одно предприятие '${card.name}' за ${card.price}`;
      } else {
        this.companies[cardId] = 1;
        report = `${this.name} покупает предприятие '${card.name}' за ${card.price}`;
      }
    }

    if (card.type === "sight") {
      // TODO возможность снести достопримечательность
      this.sights[cardId] = true;
      report = `${this.name} открывает достопримечательность '${card.name}' за ${card.price}`;
    }

    return report;
  }
}

module.exports = Player;
