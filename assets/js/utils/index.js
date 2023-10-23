// Crée un élément HTML en utilisant les éléments passer en paramètre
export const createElement = (type, attributes = {}, children = []) => {
	// Crée un élément HTML
	const element = document.createElement(type);

	// Parcours l'objet attributes passé en paramètre pour définir les attributs de l'élément
	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}

	// Parcours les enfants passés en paramètre et les ajoute à l'élément
	for (const child of children) {
		// Si child fait partie de HTMLElement on l'ajoute en tant qu'enfant à notre HTML Element
		if (child instanceof HTMLElement) {
			element.appendChild(child);
		} else {
			// Sinon on crée un nodeText et on l'ajoute ensuite à notre HTML Element
			const textNode = document.createTextNode(child);
			element.appendChild(textNode);
		}
	}

	// Retourne l'élément HTML créé
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