import { recipes } from "../utils/recipes.js";
import { createCard, elementFilter } from "../utils/index.js";

import { dropDownFactory } from "../index.js";

/* ------------------ Factory ------------------ */

export const CardFactory = () => {
    const cardContainer = document.querySelector(".card-container");

    let cards = [];
    let tags = [];

    const initialize = () => {
        const receipesNumber = document.getElementById("receipesNumbers");
        receipesNumber.innerText = `${recipes.length} recettes`;
        
        resetCards();
    }

    const resetCards = () => {
        cards = [];

        recipes.forEach((r) => {
            setCards(r);
        });
    };

    const renderCards = () => {
        const error = document.getElementsByClassName("error")[0];
        let input = document.getElementById("search").value;
        if(input.length < 3) input = "";

        cards = [];
        cardContainer.querySelectorAll('.card').forEach((c) => c.remove());

        const tagsInfo = tags.map((t) => t.textContent);
        const tagsResults = (tagsInfo.length !== 0) ? elementFilter(recipes, tagsInfo) : [];
        const search = (input !== "") ? elementFilter((tagsInfo.length !== 0) ? tagsResults : recipes, [input]) : [];

        if(tagsResults.length === 0 && search.length === 0 && input === "") return resetCards();
        const cardRender = (input !== "") ? search : new Set([...tagsResults, ...search]);

        if(cardRender.length === 0) error.innerText = `Aucune recette ne contient '${input}' vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        if(cardRender.length !== 0) {
            if(error.textContent.length !== 0) error.innerText = "";
            cardRender.forEach((card) => setCards(card));
        }
    }

    const setCards = (card) => {
        if(cards.includes(card)) return;
        const c = createCard(card);

        cardContainer.appendChild(c);
        cards.push(card);
    }

    const getCards = () => {
        return cards;
    }

    const renderTags = (e) => {
		const selectorContainer = document.getElementsByClassName("selectors-container")[1];
		selectorContainer.appendChild(dropDownFactory.createTag(e.textContent));

        renderCards();
	}

    const setTags = (tag) => {
        if(tags.includes(tag)) return;

        tags.push(tag);
        renderTags(tag);
    }

    const removeTag = (tag) => {
        tags.splice(tags.indexOf(tag), 1);
        renderCards();
    }

    const getTags = () => {
        return tags;
    }

    return {
        initialize,
        renderCards,
        getCards,
        setTags,
        removeTag,
        getTags
    };
}