export const autoSpace = (value) => {
    const spacesAndNonDigits = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const haveRestrictedLength = spacesAndNonDigits.match(/\d{4,16}/g);
    const matchedValue = (haveRestrictedLength && haveRestrictedLength[0]) || '';
    
    const parts = [];
    for (let i = 0; i < matchedValue.length; i += 4) {
        parts.push(matchedValue.substring(i, i + 4));
    };

    return parts.length ? parts.join(' ') : value;
};

export const autoSign = (sign, value, length) => {
    let formattedValue = value;
    const charLength = value.length;

    if ((charLength === 2 || charLength === 5) && (charLength < length)) {
        formattedValue += sign;
    };

    return formattedValue;
};