export const saveLocalStorage = ({key = 'todos', value}: {key: string, value: string}) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorageItem = (key: string = 'todos') => JSON.parse(localStorage.get(key));


