export const parseAddressToObject = (string) => {
    const values = string && string.split(', ');

    let parsedAddress = {
        streetAddress: "",
        lga: "",
        state: "",
        country: ""
    };

    if (values) {
        parsedAddress = {
            streetAddress: values[0],
            lga: values[1],
            state: values[2],
            country: values[3]
        }; 
    };

    return parsedAddress;
};