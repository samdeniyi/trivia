export const mapLgaByAvaliableStates = (state, data) => {
    const foundState = state && data.find(item => item.name === state);

    if (state && foundState) {
        return foundState.localGovt.map(lga => ({
            value: lga.toLowerCase(),
            label: lga
        }));
    } else return [];
};