const STORAGE_KEY = 'BOOKSHELF';

let books = [];

const isStorageExist = () => {
    if (typeof Storage == 'undefined') {
        alert('Your Browser does not support local storage');
        return false;
    }

    return true;
};

const saveData = () => {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
};

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    const data = JSON.parse(serializedData) || [];
    books = data;

    document.dispatchEvent(new Event('ondataloaded'));
};

const updateDataToStorage = () => {
    if (isStorageExist()) saveData();
};

const composeTodoObject = (title, author, year, isComplete) => {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };
};

const findBook = bookId => {
    for (let book of books) {
        if (book.id === bookId) return book;
    }
    return null;
};

const findBookIndex = bookId => {
    let index = 0;
    for (let book of books) {
        if (book.id === bookId) return index;

        index++;
    }

    return -1;
};

export {
    books,
    loadDataFromStorage,
    composeTodoObject,
    updateDataToStorage,
    findBook,
    findBookIndex,
    isStorageExist
};
