import bakeryFree from "./images/bakeryFree.png";
import wheatField from "./images/wheatField.png";
import pharm from "./images/pharm.png";
import townHall from "./images/townHall.png";
import port from "./images/port.png";
import portClosed from './images/portClosed.png';

export const CARD_IMAGES = {
  0: wheatField,
  1: bakeryFree,
  2: pharm,
  3: {
    open: townHall,
  },
  4: {
    open: port,
    closed: portClosed,
  }
}