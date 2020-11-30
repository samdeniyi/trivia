export const filterCustomers = (type, customers, setAllCustomers) => {
    if (type === "All Customers") {
        setAllCustomers(customers);
    } else if (type === "Owing Customers") {
        setAllCustomers(customers.filter(customer => customer.owing === true));
    };
};