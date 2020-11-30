export const parseTextCountRender = (count, word) => {
    let countToRender = `${count} ${word}s`;

    if (count.toString().slice(-1).includes("1")) {
        countToRender = `${count} ${word}`;
    };

    return countToRender;
};

export const grammarSpellCheck = count => {
    return count.toString().slice(-1).includes("1") ? "is" : "are";
};