export const mapAvailableStates = (data) => {

    if (data.length) {
        return data.map(item => ({
            value: item.name.toLowerCase(),
            label: item.name
        }));
    } else return [];
};

