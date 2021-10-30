import bakeryFree from "./images/bakeryFree.png";
import wheatFieldFree from "./images/wheatFieldFree.png";
import pharm from "./images/pharm.png";
import townHall from "./images/townHall.png";
import port from "./images/port.png";
import portClosed from './images/portClosed.png';
import cafe from './images/cafe.png';
import airport from './images/airport.png';
import airportClosed from './images/airportClosed.png';
import amusementPark from './images/amusementPark.png';
import amusementParkClosed from './images/amusementParkClosed.png';
import bakery from './images/bakery.png';
import cheeseDairy from './images/cheeseDairy.png';
import cornfield from './images/cornfield.png';
import dismantlingCompany from './images/dismantlingCompany.png';
import flowerGarden from './images/flowerGarden.png';
import flowerShop from './images/flowerShop.png';
import radioTower from './images/radioTower.png';
import radioTowerClosed from './images/radioTowerClosed.png';
import railwayStation from './images/railwayStation.png';
import railwayStationClosed from './images/railwayStationClosed.png';
import shop from './images/shop.png';
import shoppingMall from './images/shoppingMall.png';
import shoppingMallClosed from './images/shoppingMallClosed.png';
import supermarket from './images/supermarket.png';
import wheatField from './images/wheatField.png';

export const CARD_IMAGES = {
  0: {
    free: wheatFieldFree,
    paid: wheatField,
  },
  1: {
    free: bakeryFree,
    paid: bakery,
  },
  2: pharm,
  3: {
    open: townHall,
  },
  4: {
    open: port,
    closed: portClosed,
  },
  5: cafe,
  6: {
    open: airport,
    closed: airportClosed,
  },
  7: {
    open: amusementPark,
    closed: amusementParkClosed,
  },
  // 8
  9: cheeseDairy,
  10: cornfield,
  11: dismantlingCompany,
  12: flowerGarden,
  13: flowerShop,
  14: {
    open: radioTower,
    closed: radioTowerClosed,
  },
  15: {
    open: railwayStation,
    closed: railwayStationClosed,
  },
  16: shop,
  17: {
    open: shoppingMall,
    closed: shoppingMallClosed,
  },
  18: supermarket,
}