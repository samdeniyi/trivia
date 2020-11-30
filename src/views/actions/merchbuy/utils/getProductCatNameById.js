
export const productCategoryName = (productCategories, id) => {
   const category = productCategories.find(x => x.id === id)
   const name = (category === undefined)? "": category.name;
   return name
};