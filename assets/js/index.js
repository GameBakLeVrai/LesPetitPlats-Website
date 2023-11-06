import { recipes } from "./utils/recipes.js";

import { createDropdown, renderCards, handleCross } from "./utils/index.js";
import DropdownFactory from "./factories/DropdownFactory.js";

/* ------------------ Variables initialization ------------------ */

const cardContainer = document.querySelector(".card-container");
const receipesNumber = document.getElementById("receipesNumbers");
const dropdownContainer = document.querySelector(".dropdown-container");

/* ------------------ Pages initialization ------------------ */

// Get list of all applicances without duplicate
const ingredients = DropdownFactory.get(recipes, 'ingredients');
const ustensils = DropdownFactory.get(recipes, 'ustensils');
const appliances = DropdownFactory.get(recipes, 'appliance');

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
renderCards(cardContainer, recipes, "");

document.querySelectorAll("input").forEach((i) => i.addEventListener("keyup", () => {
    handleCross(i);
    renderCards(cardContainer, recipes, i.value);
}));