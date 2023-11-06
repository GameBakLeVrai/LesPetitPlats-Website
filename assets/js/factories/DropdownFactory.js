function isObject(obj) {
	return typeof obj === 'object' && obj !== null && ! Array.isArray(obj);
};

export default class DropdownFactory {
	static get(recipes, type) {
		let result = [];

		recipes.forEach((r) => {
			Array.isArray(r[type]) ? r[type].forEach((i) => result.push(isObject(i) ? i.ingredient.toUpperCase() : i.toUpperCase())) : result.push(r[type].toUpperCase());
		});

		return [...new Set(result)];
	}
}