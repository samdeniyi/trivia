export const findMapKeyByValues = (map, searchValue) => {
    const arrayMap = [...map.entries()];

    for (let [key, properties] of arrayMap) {
        for (let value in properties) {
            if (properties[value] === searchValue) return key;
        };

        if(key === searchValue) return properties.name;
    };
};