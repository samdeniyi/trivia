const fingerprint = require('browser-fingerprint')();

export const authHeader = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    return { 
      "Authorization": `Bearer ${token}`,
      "fingerprint": fingerprint, 
    };
  } else {
    return {};
  }
}
