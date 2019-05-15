const timeout = () => {
    return new Promise(resolve => setTimeout(resolve, 600));
}

const generateID = () => {
    return Math.random().toString(36).substr(2, 6);
}

export {
    timeout,
    generateID
}