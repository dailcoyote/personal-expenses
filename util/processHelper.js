const timeout = (wait=600) => {
    return new Promise(resolve => setTimeout(resolve, wait));
}

const generateID = () => {
    return Math.random().toString(36).substr(2, 6);
}

export {
    timeout,
    generateID
}