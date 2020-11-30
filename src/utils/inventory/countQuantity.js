export const countQuantity = (list, element) => {
    const quantityList = 
        (list.length > 0) ? 
        list.flatMap(item => item[element]).filter(item => item !== "PENDING") : [];
    
    const quantityCount = quantityList && quantityList.reduce((sum, current) => {
        return sum += current;
    }, 0);

    return parseInt(quantityCount);
};