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
    return DEFAULT_COMPANIES.reduce((result, company) => {
      result[company] = 1;
      return result;
    }, {});
  }

  addMoney(amount) {
    this.cash += amount;
  }

  takeMoney(amount) {
    this.cash -= amount;
    if (this.cash < 0) this.cash = 0;
  }

  addIncome(diceNumber, hisTurn) {
    const incomeReport = [];
    try {
      for (const companyId in this.companies) {
        if (!CARDS[companyId]) {
          throw new Error(`Нет эффекта для карты ${companyId}`);
        }
        if (
          CARDS[companyId].class !== "red" &&
          CARDS[companyId].effectOn.some((item) => item === diceNumber)
        ) {
          const suchCompanyCount = this.companies[companyId];
          for (let i = 0; i < suchCompanyCount; i++) {
            const report = CARD_EFFECTS[companyId](this, hisTurn);
            if (report) {
              incomeReport.push(`${this.name}: ${CARDS[companyId].name}: ${report}`);
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }

    // если денег нет и есть ратуша добавить 1 монету
    if (this.cash === 0 && 3 in this.sights) {
      this.addMoney(1);
      incomeReport.push(`${this.name}: Ратуша: получена 1 монета`);
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
