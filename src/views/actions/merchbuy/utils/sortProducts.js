export const sortProducts = (type, products, setProducts) => {
    if (type === "Most Recent") {
        setProducts([...products].reverse());
    } else if (type === "Oldest") {
        setProducts([...products]);
    } else if (type === "Highest Price") {
        setProducts([...products].sort((a, b) => b.minPrice - a.minPrice));
    } else if (type === "Lowest Price") {
        setProducts([...products].sort((a, b) => a.minPrice - b.minPrice));
    };
};