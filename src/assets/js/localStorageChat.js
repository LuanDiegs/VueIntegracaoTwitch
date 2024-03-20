
// Localhost com TTL
export const setLocalStorage = (keyName, keyValue, ttl) => {
    const data = {
        value: keyValue,
        ttl: Date.now() + (ttl * 1000),
        vinculado: true,
    }
 
    // Guarda o localhost
    localStorage.setItem(keyName, JSON.stringify(data));
};

export const verificaLocalStorage = (keyname) => {return getLocalStorage(keyname)};

export const getLocalStorage = (keyName) => {
    const data = localStorage.getItem(keyName);
    if (!data) {
        return null;
    }
 
    const item = JSON.parse(data);
 
    if (Date.now() > item.ttl) {
        localStorage.removeItem(keyName);
        return null;
    }
 
    return item.value;
};