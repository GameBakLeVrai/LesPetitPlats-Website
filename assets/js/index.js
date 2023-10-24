import { recipes } from "./utils/recipes.js";
import { createCard, createDropdown, getUstensils, getApplicances, getIngredients } from "./utils/index.js";

// Variables initialization

const cardContainer = document.querySelector(".card-container");
const receipesNumber = document.getElementById("receipesNumbers");
const dropdownContainer = document.querySelector(".dropdown-container");

// Page initialization

// Get list of all applicances without duplicate
const ingredients = getIngredients(recipes);
const appliances = getApplicances(recipes);
const ustensils = getUstensils(recipes);

console.log("appliances", appliances);
console.log("ustensils", ustensils);
console.log("ingredients", ingredients);

[
    {
        name: "Ingrédients",
        list: ingredients
    },
    {
        name: "Appareils",
        list: appliances
    },
    {
        name: "Ustensiles",
        list: ustensils
    }
].forEach((el) => dropdownContainer.appendChild(createDropdown(el.name, el.list)));

receipesNumber.innerText = `${recipes.length} recettes`;

recipes.map((r) => {
    const card = createCard(r);
    cardContainer.appendChild(card);
});