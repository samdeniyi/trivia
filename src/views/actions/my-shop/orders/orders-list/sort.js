export const sortOrders = (type, orders, setAllOrders) => {
    if (type === "Most Recent") {
        setAllOrders([...orders].sort((a, b) => b.createdDate.localeCompare(a.createdDate)));
    } else if (type === "Oldest") {
        setAllOrders([...orders].sort((a, b) => a.createdDate.localeCompare(b.createdDate)));
    } else if (type === "Lowest Amount") {
        setAllOrders([...orders].sort((a, b) =>  a.totalPrice - b.totalPrice));
    } else if (type === "Highest Amount") {
        setAllOrders([...orders].sort((a, b) =>  b.totalPrice - a.totalPrice));
    };
};