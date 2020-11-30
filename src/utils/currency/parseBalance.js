export const unparseBalance = balance => {
    return Number(balance.replace(/[^0-9.-]+/g,""));
};