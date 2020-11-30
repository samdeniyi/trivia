export const filterTransactions = (type, transactions, setAllTransactions) => {
    if (type === "All Transactions") {
        transactions && setAllTransactions([...transactions]);
    } else if (type === "Credit") {
        transactions && setAllTransactions([...transactions].filter(data => data.flowType ==="IN"));
    } else if (type === "Debit") {
        transactions && setAllTransactions([...transactions].filter(data => data.flowType ==="OUT"));
    }
    // else if (type === "Commissions") {
    //     setAllTransactions([...transactions].filter(data => data.category === "COMMISSION"));
    // } else if (type === "Bonuses") {
    //     setAllTransactions([...transactions].filter(data => data.category === false));
    // };
};