export const getOrderTypeName = data => {
    
    return (data.packedCount > 0 || data.cancelledCount > 0 || data.deliveredCount > 0)? "Attended": "Pending";
};