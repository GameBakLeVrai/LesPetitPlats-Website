import { recipes } from "./utils/recipes.js";
import { createElement, createCard, createDropdown, getUstensils, getApplicances, getIngredients, eraseCross, renderSelections } from "./utils/index.js";

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
recipes.map((r) => {
    const card = createCard(r);
    cardContainer.appendChild(card);
});

document.querySelectorAll("input").forEach((i) => i.addEventListener("keyup", () => {
    const cross = i.parentElement.querySelector(".cross");
    const crossPicture = createElement("img", { class: (i.id === "search") ? "cross" : "cross cross-dropdown", src: "./assets/images/Cross.svg", alt: "Croix" });

    crossPicture.addEventListener("click", () => eraseCross(crossPicture, i));

    if(i.value.length < 1) return (cross) ? eraseCross(crossPicture, i) : 0;
    if(cross) return;

    i.parentElement.lastElementChild.style.marginLeft = "unset";
    i.parentElement.insertBefore(crossPicture, i.parentElement.lastElementChild);
}));