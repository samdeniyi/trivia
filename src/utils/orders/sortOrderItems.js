export const sortOrderItems = (items) => {
    const orderItems = (items)? [...items]: [];
    let sortedItems = []
    for(let i = 0; i < orderItems.length; i++) {
        const current = [...sortedItems].find(x => x.productName === orderItems[i].productName && x.orderItemStatus === orderItems[i].orderItemStatus)
        const index = [...sortedItems].findIndex(x => x.id === orderItems[i].id)
        if(current) {
            current.totalPrice +=orderItems[i].totalPrice;
            current.quantity += orderItems[i].quantity;
            current.newQuantity = current.quantity;
            current.itemIDs.push(orderItems[i].id);
           sortedItems[index] = current
        }
        else {
            const init = orderItems[i]
            init.itemIDs = [];
            init.PricePerOne = init.totalPrice / init.quantity;
            init.newQuantity = init.quantity;
            init.itemIDs.push(init.id)
            sortedItems.push(init) 
        }

    }
    return sortedItems;
};