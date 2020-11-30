export const selectAreasByState = (state, areas) => {
    const foundState = state && areas && areas.filter(area => area.state === state);

    if (state && foundState) {
        if (!foundState[0]) return []
        return foundState[0].lgas.map(lga => ({
            value: lga.toLowerCase(),
            label: lga
        }));
    } else return null;
};