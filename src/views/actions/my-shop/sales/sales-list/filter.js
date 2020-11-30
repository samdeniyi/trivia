export const filterSales = (type, sales, setAllSales) => {
    if (type === "All Sales") {
        setAllSales(sales);
    } else if (type === "Complete Payment") {
        setAllSales(sales.filter(data => data.salesInfo.paymentCompleteStatus === true));
    } else if (type === "Incomplete Payment") {
        setAllSales(sales.filter(data => data.salesInfo.paymentCompleteStatus === false));
    };
};