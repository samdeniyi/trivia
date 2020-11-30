export const sortCartItems = items => {
    const cartItems = items ? [...items] : [];
    let sortedItems = [];
    let noShop = {
        shopName: "No Shop",
        items: []
    };

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].shopData !== undefined) {
            const current = [...sortedItems].find(
                x => x.shopName === cartItems[i].shopData.shopName
            );
            const index = [...sortedItems].findIndex(
                x => x.shopName === cartItems[i].shopData.shopName
            );
            if (current) {
                current.items.push({
                    cost: cartItems[i].cost,
                    quantity: cartItems[i].quantity,
                    product: cartItems[i].product
                });
                sortedItems[index] = current;
            } else {
                const init = cartItems[i].shopData;
                init.items = [];
                init.items.push({
                    cost: cartItems[i].cost,
                    quantity: cartItems[i].quantity,
                    product: cartItems[i].product
                });
                sortedItems.push(init);
            }
        } else {
            noShop.items.push({
                cost: cartItems[i].cost,
                quantity: cartItems[i].quantity,
                product: cartItems[i].product
            });
        }
    }
    if (noShop.items.length) sortedItems.push(noShop);

    return sortedItems;
};