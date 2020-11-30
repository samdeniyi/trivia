import { formatPrice } from "./formatPriceWithComma";
import { unparseBalance } from "./parseBalance";

export const countAmount = (list, element) => {
    const currencyList = list ? list.flatMap(item => item[element]) : [];

    const countedAmount = currencyList && currencyList.reduce((sum, current) => {
        return sum += current;
    }, 0);

    return formatPrice(countedAmount) || 0;
};

export const amountShare = (amount, value) => {
    return `${Math.round((value / unparseBalance(amount)) * 100)}%`
};