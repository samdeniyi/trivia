export const sortOrders = (type, orders, setAllOrders) => {
    if (type === "Most Recent") {
        orders && setAllOrders([...orders].sort((a, b) => b.createdDate.localeCompare(a.createdDate)));
    } else if (type === "Oldest") {
        orders && setAllOrders([...orders].sort((a, b) => a.createdDate.localeCompare(b.createdDate)));
    } else if (type === "Lowest Amount") {
        orders && setAllOrders([...orders].sort((a, b) =>  a.totalPrice - b.totalPrice));
    } else if (type === "Highest Amount") {
        orders && setAllOrders([...orders].sort((a, b) =>  b.totalPrice - a.totalPrice));
    };
};