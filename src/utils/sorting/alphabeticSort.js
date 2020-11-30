export const listToAlphabetMap = (list) => {
    const alphabeticList = [];
    const alphabetLetters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    const listUniqueFirstLetters = new Set(list.map(item => item.slice(0, 1).toUpperCase()).sort());
        
    [...listUniqueFirstLetters.values()].forEach(letter => {
        const alphabeticListLetters = 
            alphabeticList.length > 0 ? 
            alphabeticList.map(item => item.letter) : [];

        if (alphabetLetters.includes(letter) && !alphabeticListLetters.includes(letter)) {
            const itemsStartingWithLetter = [];

            list.forEach(listItem => {
                if (letter === listItem.slice(0, 1).toUpperCase()) {
                    itemsStartingWithLetter.push(listItem);
                };
            });

            alphabeticList.push({ letter, items: itemsStartingWithLetter });
        }
    });

    return alphabeticList;
};