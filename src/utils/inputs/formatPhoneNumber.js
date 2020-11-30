export const insertZero = phoneNumber => {
    let num = String(phoneNumber)
    num = (num.startsWith("234") && num.length > 12) ? num.slice(3) : num;
    return (num.startsWith("0") && (num.length > 10)) ? num : `0${num}`;
};

export const insertCountryCode = (phoneNumber, countryCode) => {
    const num = String(phoneNumber)
    return num.startsWith("0") ? `${countryCode}${num.slice(1)}` : `${countryCode}${num}`;
};

export const plusToZeroFormat = phoneNumber => {
    const num = String(phoneNumber)
    return (num.startsWith("+")) ? `${insertZero(num)}` : num;
};

