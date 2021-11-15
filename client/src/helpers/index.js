import { orderBy, sortBy } from "lodash";
import CARDS from "../constants/cards.json";

export const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export const filterCompanies = (cards) => Object.values(cards).filter(card => card.type === "company");

export const sortCompaniesByClassAndEffect = (cards) => {
  const companies = filterCompanies(cards);
  return sortBy(companies, [(c) => c.class], [(c) => c.effectOn[0]]);
}

export const sortCompaniesByEffect = (cards) => sortBy(cards, (c) => c.effectOn[0]);

export const sortCompaniesForPlayer = (companies) => {
  return sortBy(Object.entries(companies).map(([cardId, howMany]) => ({ ...CARDS[cardId], howMany })), (c) => c.effectOn[0]);
}