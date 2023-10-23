import { recipes } from "./utils/recipes.js";
import { createCard, getUstensils, getApplicances, getIngredients } from "./utils/index.js";

// Variables initialization

const cardContainer = document.querySelector(".card-container");
const receipesNumber = document.getElementById("receipesNumbers");

// Page initialization

// Get list of all applicances without duplicate
const ingredients = getIngredients(recipes);
const appliances = getApplicances(recipes);
const ustensils = getUstensils(recipes);

console.log(appliances, ustensils, ingredients);

receipesNumber.innerText = `${recipes.length} recettes`;

recipes.map((r) => {
    const card = createCard(r);
    cardContainer.appendChild(card);
});