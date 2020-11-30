import { months } from "./months";

const formattedTransactionDate = date => {
    const parsedDate = new Date(date);
    return `${months[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
};

export const parseTransactionsByDate = (transactions, dateParam = "createdAt") => { 
    if (!transactions || !transactions.length || transactions.length === 0) return [];
    
    const formattedTransactions = [];

    const transactionsDates =
        new Set(transactions.map(transaction => formattedTransactionDate(transaction[dateParam])));
    
    [...transactionsDates.values()].forEach(date => {
        const savedDates = formattedTransactions.map(savedTransaction => savedTransaction.date);
        
        if (!savedDates.includes(date)) {
            const transactionsByDate = [];

            transactions.forEach(transaction => {
                const transactionDate = formattedTransactionDate(transaction[dateParam]);

                if (transactionDate === date) {
                    transactionsByDate.push(transaction);
                };
            });

            formattedTransactions.push({ date, transactions: transactionsByDate });
        };
    });

    return formattedTransactions;
};