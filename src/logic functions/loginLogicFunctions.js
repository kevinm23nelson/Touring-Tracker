const validateCredentials = (username, password) => {
    return username.startsWith('traveler') && password === 'travel';
};

const extractTravelerId = (username) => {
    return parseInt(username.slice(8));
};

export { validateCredentials, extractTravelerId };
