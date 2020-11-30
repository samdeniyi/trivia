import { formatPrice } from "../currency/formatPriceWithComma";
import { unparseBalance } from "../currency/parseBalance";

const calculateTotalPrice = selectedProducts => {
    return selectedProducts.reduce((sum, current) => {
        return sum += (current.quantity * current.itemPrice);
    }, 0);
};

export const calculateProductsSubTotal = (selectedProducts, vat = 0) => {
    const total = calculateTotalPrice(selectedProducts);
    return formatPrice(total - (total * vat));
};

export const calculateProductsTotal = (selectedProducts, discount = 0, vat = 0, amountOutstanding = 0) => {
    const subTotal = unparseBalance(calculateProductsSubTotal(selectedProducts, vat));
    return formatPrice(subTotal - discount - amountOutstanding);
};

// export const calculateProductsVAT = (selectedProducts, discount = 0, vat = 0.05) => {
//     const total = calculateTotalPrice(selectedProducts);
//     return formatPrice((total - discount) * vat);
// };

const calculateTotalCostPrice = selectedProducts => {
    return selectedProducts.reduce((sum, current) => {
        return sum += (current.quantity * current.costPrice);
    }, 0);
};

export const calculateTotalProfit = (selectedProducts, discount = 0, vat = 0) => {
    const totalSellingPrice = unparseBalance(calculateProductsSubTotal(selectedProducts, vat));
    const totalCostPrice = calculateTotalCostPrice(selectedProducts);
    const total = totalSellingPrice - totalCostPrice;
    return formatPrice(total - discount);
};