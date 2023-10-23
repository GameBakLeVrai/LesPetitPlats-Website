import { recipes } from "./utils/recipes.js";
import { createCard } from "./utils/index.js";

const cardContainer = document.querySelector(".card-container");

// Page initialization

recipes.map((r) => {
    const card = createCard(r);
    cardContainer.appendChild(card);
});