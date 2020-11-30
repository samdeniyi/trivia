import { parseTransactionsByDate } from "../../../../utils/date/parseTransactionsByDate";

export const filterByDate = (list, selectedFilter) => {
    switch (selectedFilter) {
        case "ALL": {
            return parseTransactionsByDate(list);
        }

        case "DEBIT": {
            const filterCollected = list.filter(item => item.type === "RAVE_DEBIT");
            return parseTransactionsByDate(filterCollected);
        }

        case "CREDIT": {
            const filterCollected = list.filter(item => item.type === "RAVE_CREDIT");
            return parseTransactionsByDate(filterCollected);
        }

        case "COMMISIONS": {
            const filterCollected = list.filter(item => item.type === "COMMISSION");
            return parseTransactionsByDate(filterCollected);
        }

        case "BONUSES": {
            const filterCollected = list.filter(item => item.type === "BONUS");
            return parseTransactionsByDate(filterCollected);
        }

        default: {
            return list;
        }
    };
};