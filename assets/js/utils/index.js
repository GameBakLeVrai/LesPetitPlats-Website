/* ------------------ Creations Functions ------------------ */

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
    const picturePath = `./assets/images/recettes/${receipe.image}`;

    const picture = createElement("img", { src: picturePath, alt: `${receipe.name} image` });
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

export const createDropdown = (title, elements) => {
    const arrowPath = "./assets/images/Arrow.svg";
    const loupePath = "./assets/images/Loupe.svg";

    const dropTitle = createElement("p", {}, title);
    const arrowPicture = createElement("img", { src: arrowPath, alt: "Arrow" });
    const dropdownTitle = createElement("div", { class: "dropdown-title" }, [dropTitle, arrowPicture]);

    const searchInput = createElement("input", { type: "text", name: title, id: `${title}-search` }, []);
    searchInput.addEventListener("keyup", (e) => renderSelections(e.target));

    const loupePicture = createElement("img", { src: loupePath, alt: "Loupe" });
    const dropdownSearchBar = createElement("div", { class: "dropdown-searchbar" }, [searchInput, loupePicture]);

    const selections = elements.map((e) => {
        const p = createElement("p", {}, e);

        // Listening when element is selected
        p.addEventListener("click", (e) => renderTags(e));

        return p;
    });

    const dropdownElements = createElement("div", { class: "dropdown-elements" }, selections);
    const dropdownContent = createElement("div", { class: "dropdown-content" }, [dropdownSearchBar, dropdownElements]);

    const dropdown = createElement("div", { class: "dropdown" }, [dropdownTitle, dropdownContent]);
    return dropdown;
}

/* ------------------ Rendering Functions ------------------ */

export const renderCards = (cardContainer, recipes) => {
    const tags = document.getElementsByClassName("selectors-container")[1].querySelectorAll(".selection");
    console.log(tags)

    console.log(recipes)

    recipes.map((r) => {
        const card = createCard(r);
        cardContainer.appendChild(card);
    });
}

export const renderSelections = (e) => {
    if(e.id === "search") return;
    
    const value = e.value.toUpperCase();
    const selections = e.closest(".dropdown").querySelector(".dropdown-elements").querySelectorAll("p");

    // Check if value is same as the selection element, if it is not element is hide
    selections.forEach((s) => s.style.display = (s.textContent.toUpperCase().indexOf(value) > -1) ? "" : "none");
}

export const renderTags = (e) => {
    const selectorContainer = document.getElementsByClassName("selectors-container")[1];
    const selections = [...selectorContainer.querySelectorAll(".selection")].map((s) => s.textContent);

    const createTag = (name) => {
        const crossPath = "./assets/images/Cross.svg";

        const title = createElement("p", {}, name);
        const crossPicture = createElement("img", { src: crossPath, alt: "Croix" });

        // Remove element on click
        crossPicture.addEventListener("click", (e) => e.target.parentElement.remove());

        return createElement("div", { class: "selection" }, [title, crossPicture]);
    }

    if(!selections.includes(e.target.textContent)) selectorContainer.appendChild(createTag(e.target.textContent));
}

/* ------------------ Get Elements Functions  ------------------ */

export const getIngredients = (recipes) => {
    let ingredients = [];
    recipes.forEach((r) => r.ingredients.forEach((ing) => ingredients.push(ing.ingredient.toUpperCase())));

    return [...new Set(ingredients)];
}

export const getUstensils = (recipes) => {
    let ustensils = [];
    recipes.forEach((r) => r.ustensils.forEach((u) => ustensils.push(u.toUpperCase())));

    return [...new Set(ustensils)];
}

export const getApplicances = (recipes) => [...new Set(recipes.map((r) => r.appliance.toUpperCase()))];


/* ------------------ Cross Functions  ------------------ */

export const eraseCross = (e, i) => {
    i.value = "";
    i.parentElement.lastElementChild.style.marginLeft = (i.id === "search") ? "-60px" : "-22px";
    e.remove();

    renderSelections(i);
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