export const sortSales = (type, sales, setAllSales) => {
    if (type === "Most Recent") {
        setAllSales(
            sales.sort((a, b) => 
                new Date(b.salesInfo.localSalesDate).getTime() - 
                new Date(a.salesInfo.localSalesDate).getTime()
            )
        );
    } else if (type === "Oldest") {
        setAllSales(
            sales.sort((a, b) =>
                new Date(a.salesInfo.localSalesDate).getTime() - 
                new Date(b.salesInfo.localSalesDate).getTime()
            )
        );
    } else if (type === "Lowest Amount") {
        setAllSales(
            sales.sort((a, b) => a.salesInfo.amountCollected - b.salesInfo.amountCollected)
        );
    } else if (type === "Highest Amount") {
        setAllSales(
            sales.sort((a, b) => b.salesInfo.amountCollected - a.salesInfo.amountCollected)
        );
    };
};