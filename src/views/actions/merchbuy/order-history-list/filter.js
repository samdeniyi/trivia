import moment from "moment";

export const filterOrders = (type, orders, setAllOrders) => {
    if (type === "All Orders") {
        orders && setAllOrders([...orders]);
    } else if (type === "Pending Orders") {
        orders &&setAllOrders([...orders].filter(data => data.packedCount === 0 && data.cancelledCount === 0));
    } else if (type === "Attended Orders") {
        orders && setAllOrders([...orders].filter(data => data.packedCount > 0 || data.cancelledCount > 0 || data.deliveredCount > 0));
    } else if (type === "Today") {
        orders && setAllOrders(
            [...orders].filter(data =>
                moment(data.createdDate).isSame(new Date(), "day")
            )
        );
    } else if (type === "This Week") {
        orders &&  setAllOrders(
            [...orders].filter(data =>
                moment(data.createdDate).isSame(new Date(), "week")
            )
        );
    } else if (type === "This Month") {
        orders &&  setAllOrders(
            [...orders].filter(data =>
                moment(data.createdDate).isSame(new Date(), "month")
            )
        );
    } else if (type === "This Year") {
        orders && setAllOrders(
            [...orders].filter(data =>
                moment(data.createdDate).isSame(new Date(), "year")
            )
        );
    }
};
