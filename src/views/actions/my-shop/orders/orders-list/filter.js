import moment from "moment";

export const filterOrders = (type, orders, setAllOrders) => {
    if (type === "All Orders") {
        setAllOrders(orders);
    } else if (type === "Pending Orders") {
        setAllOrders([...orders].filter(data => data.packedCount === 0 && data.cancelledCount === 0));
    } else if (type === "Attended Orders") {
        setAllOrders([...orders].filter(data => data.packedCount > 0 || data.cancelledCount > 0 || data.deliveredCount > 0));
    } else if (type === "Today") {
        setAllOrders(
            [...orders].filter(data =>
                moment(data.createdDate).isSame(new Date(), "day")
            )
        );
    } else if (type === "This Week") {
        setAllOrders(
            [...orders].filter(data =>
                moment(data.createdDate).isSame(new Date(), "week")
            )
        );
    } else if (type === "This Month") {
        setAllOrders(
            [...orders].filter(data =>
                moment(data.createdDate).isSame(new Date(), "month")
            )
        );
    } else if (type === "This Year") {
        setAllOrders(
            [...orders].filter(data =>
                moment(data.createdDate).isSame(new Date(), "year")
            )
        );
    }
};
