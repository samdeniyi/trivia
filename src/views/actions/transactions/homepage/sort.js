export const sortTransactions = (type, transactions, setAllTransactions) => {
    if (type === "Most Recent") {
        transactions && setAllTransactions(
            [...transactions].sort((a, b) => 
                new Date(b.createdAt).getTime() - 
                new Date(a.createdAt).getTime()
            )
        );
    } else if (type === "Oldest") {
        transactions && setAllTransactions(
            [...transactions].sort((a, b) =>
                new Date(a.createdAt).getTime() - 
                new Date(b.createdAt).getTime()
            )
        );
    } else if (type === "Lowest Amount") {
        transactions && setAllTransactions(
            [...transactions].sort((a, b) => a.amount - b.amount)
        );
    } else if (type === "Highest Amount") {
        transactions && setAllTransactions(
            [...transactions].sort((a, b) => b.amount - a.amount)
        );
    };
};