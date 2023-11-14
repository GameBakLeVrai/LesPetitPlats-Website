import { recipes } from "../utils/recipes.js";
import { createElement, getImg } from "../utils/index.js";

import { cardFactory } from "../index.js";

/* ------------------ Creations Functions ------------------ */

const isObject = (obj) => typeof obj === 'object' && obj !== null && !Array.isArray(obj);

const get = (recipes, type) => {
	let result = [];

	recipes.forEach((r) => {
		Array.isArray(r[type]) ? r[type].forEach((i) => result.push(isObject(i) ? i.ingredient.toUpperCase() : i.toUpperCase())) : result.push(r[type].toUpperCase());
	});

	return [...new Set(result)];
}

/* ------------------ Factory ------------------ */

export const DropdownFactory = () => {
	var ingredients = get(recipes, 'ingredients');
	var ustensils = get(recipes, 'ustensils');
	var appliances = get(recipes, 'appliance');

	const initialize = () => {
		const dropdownContainer = document.querySelector(".dropdown-container");
		const menu = [
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
		];

		menu.forEach((el) => dropdownContainer.appendChild(create(el.name, el.list)));
	}

	const create = (title, elements) => {
		const dropTitle = createElement("p", {}, title);
		const arrowPicture = createElement("img", { src: getImg("Arrow.svg"), alt: "Arrow" });
		const dropdownTitle = createElement("div", { class: "dropdown-title" }, [dropTitle, arrowPicture]);

		const searchInput = createElement("input", { type: "text", name: title, id: `${title}-search` }, []);
		searchInput.addEventListener("keyup", (e) => renderSelections(e.target));

		const loupePicture = createElement("img", { src: getImg("Loupe.svg"), alt: "Loupe" });
		const dropdownSearchBar = createElement("div", { class: "dropdown-searchbar" }, [searchInput, loupePicture]);

		const selections = elements.map((e) => {
			const p = createElement("p", {}, e);

			// Listening when element is selected
			p.addEventListener("click", (e) => cardFactory.setTags(e.target));

			return p;
		});

		const dropdownElements = createElement("div", { class: "dropdown-elements" }, selections);
		const dropdownContent = createElement("div", { class: "dropdown-content" }, [dropdownSearchBar, dropdownElements]);

		return createElement("div", { class: "dropdown" }, [dropdownTitle, dropdownContent]);
	}

	const createTag = (name) => {
		const title = createElement("p", {}, name);
		const crossPicture = createElement("img", { src: getImg("Cross.svg"), alt: "Croix", style: "pointer-events: initial;" });

		// Remove element on click
		crossPicture.addEventListener("click", (e) => {
			cardFactory.getTags().forEach((tag) => {
				const element = e.target.parentElement.querySelector('p');
				if(tag.textContent === element.textContent) cardFactory.removeTag(tag);
			});
			
			e.target.parentElement.remove()
		});

		return createElement("div", { class: "selection" }, [title, crossPicture]);
	}

	const renderSelections = (e) => {
		if(e.id === "search") return;
		
		const value = e.value.toUpperCase();
		const selections = e.closest(".dropdown").querySelector(".dropdown-elements").querySelectorAll("p");
	
		// Check if value is same as the selection element, if it is not element is hide
		selections.forEach((s) => s.style.display = (s.textContent.toUpperCase().indexOf(value) > -1) ? "" : "none");
	}

	return {
		initialize,
		createTag,
		renderSelections
	}
}