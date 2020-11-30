export const thirdPartyError = (error, by = ': ', property = 'message') => {
    
    return JSON.parse(error.response.data[property].split(by)[1])[0];
};