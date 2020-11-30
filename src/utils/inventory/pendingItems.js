export const filterItemsByValue = (items, value) => {
    return items.filter(item => item[value]);
};

export const checkItemParameter = (items, parameter) => {
    return items.some(item => item.status === parameter);
};

export const findCatgoryInList = (categoriesList, category) => {
    const categoryName = categoriesList.find(c => c.id === category || c.name === category);
    return categoryName ? categoryName.name : category
};