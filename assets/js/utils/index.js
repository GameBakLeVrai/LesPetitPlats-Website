import { cardFactory, dropDownFactory } from "../index.js";

/* ------------------ Creations Functions ------------------ */

export const elementFilter = (array, values) => {
	return array.filter((data) => {
		// Vérifier si toutes les valeurs sont présentes dans l'élément
		return values.every((value) => {
			return JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1;
		});
	});
};
  
export const getImg = (name) => `./assets/images/${name}`;

// Create an HTML element using elements passed as parameters
export const createElement = (type, attributes = {}, children = []) => {
	// Create an HTML element
	const element = document.createElement(type);

	// Browse the attributes object passed in parameter to define the element's attributes
	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}

	// Browse the children passed as parameters and add them to the
	for (const child of children) {
		// If child is part of HTMLElement, we add it as a child to our HTML Element
		if (child instanceof HTMLElement) {
			element.appendChild(child);
		} else {
			// Otherwise, we create a nodeText and add it to our HTML Element
			const textNode = document.createTextNode(child);
			element.appendChild(textNode);
		}
	}

	// Return the HTML element created
	return element;
};

export const createCard = (receipe) => {
    const picture = createElement("img", { src: getImg(`recettes/${receipe.image}`), alt: `${receipe.name} image` });
    const time = createElement("span", {}, `${receipe.time}min`);
    const media = createElement("div", { class: "card-img__container" }, [picture, time]);

    const name = createElement("h3", {}, receipe.name);

    const subOne = createElement("p", { class: "card-subtitle"}, "RECETTE");
    const desc = createElement("p", { class: "card-desc"}, receipe.description.substring(0, 200)+'...');
    const descriptions = createElement("div", { class: "card-section" }, [subOne, desc]);

    const subTwo = createElement("p", { class: "card-subtitle"}, "Ingrédients");
    let ingredientsContainer = createElement("div", { class: "card-column__container" }, []);

    receipe.ingredients.forEach((i) => {
        const name = createElement("p", {}, i.ingredient);

        const quantity = (i.quantity) ? i.quantity : "";
        let unit = "";

        switch(i.unit) {
            case "grammes":
                unit = "g";
                break;

            default:
                if(i.unit !== undefined) unit = (i.unit.length > 2) ? ` ${i.unit}` : i.unit;
        }

        const details = createElement("span", {}, `${quantity}${unit}`);

        const ingredient = createElement("div", { class: "card-column" }, [name, details]);
        ingredientsContainer.appendChild(ingredient);
    });

    const ingredients = createElement("div", { class: "card-section" }, [subTwo, ingredientsContainer]);
    const content = createElement("div", { class: "card-content" }, [name, descriptions, ingredients]);

    const card = createElement("div", { class: "card" }, [media, content]);
    return card;
}

/* ------------------ Cross Functions  ------------------ */

export const eraseCross = (e, i) => {
    i.value = "";
    i.parentElement.lastElementChild.style.marginLeft = (i.id === "search") ? "-60px" : "-22px";
    e.remove();

    cardFactory.renderCards();
    dropDownFactory.renderSelections(i);
}

export const handleCross = (i) => {
    const cross = i.parentElement.querySelector(".cross");

    const crossPicture = createElement("img", { class: (i.id === "search") ? "cross" : "cross cross-dropdown", src: "./assets/images/Cross.svg", alt: "Croix" });
    crossPicture.addEventListener("click", () => eraseCross(crossPicture, i));

    if(i.value.length < 1) return (cross) ? eraseCross(cross, i) : 0;
    if(cross) return;

    i.parentElement.lastElementChild.style.marginLeft = "unset";
    i.parentElement.insertBefore(crossPicture, i.parentElement.lastElementChild);
}