export const sortCustomers = (type, customers, setAllCustomers) => {
    if (type === "Most Recent") {
        setAllCustomers(customers.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()));
    } else if (type === "Oldest") {
        setAllCustomers(customers.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()));
    } else if (type === "A-Z") {
        setAllCustomers(customers.sort());
    } else if (type === "Z-A") {
        setAllCustomers(customers.sort().reverse());
    };
};