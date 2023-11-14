import { handleCross } from "./utils/index.js";

import { DropdownFactory } from "./factories/DropdownFactory.js";
import { CardFactory } from "./factories/CardFactory.js";

/* ------------------ Variables Initialization ------------------ */

export const cardFactory = CardFactory();
export const dropDownFactory = DropdownFactory();

/* ------------------ Pages initialization ------------------ */

cardFactory.initialize();
dropDownFactory.initialize();

document.querySelectorAll("input").forEach((i) => i.addEventListener("keyup", () => {
    handleCross(i);
    if(i.id === "search") cardFactory.renderCards(i.value);
}));