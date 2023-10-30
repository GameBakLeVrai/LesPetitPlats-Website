import { createDropdown, getUstensils, getApplicances, getIngredients, renderCards, handleCross } from "./utils/index.js";
import { recipes } from "./utils/recipes.js";

/* ------------------ Variables initialization ------------------ */

const cardContainer = document.querySelector(".card-container");
const receipesNumber = document.getElementById("receipesNumbers");
const dropdownContainer = document.querySelector(".dropdown-container");

/* ------------------ Pages initialization ------------------ */

// Get list of all applicances without duplicate
const ingredients = getIngredients(recipes);
const appliances = getApplicances(recipes);
const ustensils = getUstensils(recipes);

// Create dropdown
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

// Initialize number of receipe
receipesNumber.innerText = `${recipes.length} recettes`;

// Cards initialization
renderCards(cardContainer, recipes);

document.querySelectorAll("input").forEach((i) => i.addEventListener("keyup", () => {
    handleCross(i);
}));