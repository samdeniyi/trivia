export const disabledState = (
    loading, 
    submitting, 
    attempts = Infinity, 
    expired = false
) => {
    if (
        loading ||
        submitting ||
        (attempts >= 3) ||
        expired
    ) {
        return true
    } else return false;
};

export const emptyValues = (values, filters = []) => {
    const fieldValues = [];
    
    Object.entries(values).forEach(([key, value]) => {
        if (typeof value !== "boolean") {
            return;
        } else if (!filters.includes(key)) {
            fieldValues.push(value);
        };
    });

    return fieldValues.every(value => !!value === true);
};