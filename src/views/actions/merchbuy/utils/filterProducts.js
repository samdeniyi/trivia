export const filterProducts = (type, products, moq, priceRange, setProducts) => {

    if (type === "All Products") {
        setProducts([...products]);
    } else if (type === "By MOQ") {
        setProducts([...products].filter(data => data.moq ===  moq));
    }
    else if (type === "BY Price") {
        setProducts([...products].filter(data => 
            (data.minPrice >= priceRange.minPrice) && 
            (data.maxPrice <= priceRange.maxPrice) ));
    }
};