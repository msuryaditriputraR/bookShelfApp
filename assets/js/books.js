import { editBookModal, formModal } from './components/modal.js';
import { makeList, showListSearch, updateListBook } from './components/list.js';
import {
    books,
    composeTodoObject,
    findBook,
    findBookIndex,
    updateDataToStorage
} from './data.js';
import value from './components/search.js';

const BookId = 'itemId';
const finishShelf = document
    .getElementById('finish-book')
    .querySelector('.container-list');
const unFinishShelf = document
    .getElementById('unfinish-book')
    .querySelector('.container-list');

const addBook = () => {
    const title = document.getElementById('book-title');
    const author = document.getElementById('book-author');
    const year = document.getElementById('book-year');
    const isCompleted = document.getElementById('book-iscompleted');

    const cardBook = makeList({
        title: title.value,
        author: author.value,
        year: year.value,
        isComplete: isCompleted.checked
    });

    // NOTE: add book to local storage
    const bookObject = composeTodoObject(
        title.value,
        author.value,
        year.value,
        isCompleted.checked
    );

    books.push(bookObject);
    cardBook[BookId] = bookObject.id;
    updateDataToStorage();

    isCompleted.checked
        ? finishShelf.append(cardBook)
        : unFinishShelf.append(cardBook);

    // NOTE: so that the search value continues when add a book
    showListSearch(value[0] || '');

    // NOTE: reset value input when add Button clicked
    title.value = '';
    author.value = '';
    year.value = '';
    isCompleted.checked = false;
};

const changeStatusBook = (listBookElement, status) => {
    const title = listBookElement.querySelector('.title-book').innerText;
    const subTitle = listBookElement.querySelector('.subtitle-book').innerText;
    const [author, year] = subTitle.split(' | ');

    const newList = makeList({ title, author, year, isComplete: status });

    const bookObject = composeTodoObject(title, author, year, status);

    books.push(bookObject);
    newList[BookId] = bookObject.id;
    updateDataToStorage();

    status ? finishShelf.append(newList) : unFinishShelf.append(newList);

    // NOTE: so that the search value continues when change status
    showListSearch(value[0] || '');

    deleteBook(listBookElement);
};

const deleteBook = listBookElement => {
    const bookIndex = findBookIndex(listBookElement[BookId]);
    books.splice(bookIndex, 1);
    listBookElement.remove();
    updateDataToStorage();
};

const validationInput = () => {
    const modalContent = document.querySelector('.main-content');
    const inputText = modalContent.querySelectorAll('input[type = text]');

    let isValid = true;
    const message = [];
    const elem = [];

    inputText.forEach(inp => {
        if (!inp.value.trim()) {
            message.push(inp.previousSibling.innerText + ' is Required');
            isValid = false;
            elem.push(inp);
        }

        if (inp.id == 'book-year' && inp.value.match(/\D/g)) {
            message.push(inp.previousSibling.innerText + ' must a number!');
            isValid = false;
            elem.push(inp);
        }
    });

    return {
        isValid,
        message: message[0] || '',
        elem: elem[0] || null
    };
};

const makeErrorMessage = (message, element) => {
    element.style.borderColor = 'red';
    const error = document.querySelector('.error');
    error.textContent = message;
    error.classList.replace('d-none', 'd-block');
};

const getValueInputModal = listBookElement => {
    const book = findBook(listBookElement[BookId]);

    const titleValue = book.title;
    const authorValue = book.author;
    const yearValue = book.year;
    const isComplete = book.isComplete;

    const valueObject = {
        titleValue,
        authorValue,
        yearValue
    };

    const valueFormModal = [...formModal];

    const arrValueFormModal = valueFormModal.map((input, index) => {
        let newInput = Object.assign({}, input);

        if (input.id === 'book-iscompleted') {
            newInput.isChecked = isComplete;
        } else {
            for (const [i, val] of Object.keys(valueObject).entries()) {
                if (index === i) {
                    newInput.value = valueObject[val];
                }
            }
        }

        return newInput;
    });

    editBookModal(arrValueFormModal, 'Edit Book', {
        isEdit: true,
        listBookElement
    });
};

const editBook = listBookElement => {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const year = document.getElementById('book-year').value;
    const isComplete = document.getElementById('book-iscompleted').checked;

    const book = findBook(listBookElement[BookId]);

    book.title = title;
    book.author = author;
    book.year = year;
    book.isComplete = isComplete;

    updateDataToStorage();
    updateListBook(listBookElement);
};

const loadBook = () => {
    for (let book of books) {
        const newBook = makeList({
            title: book.title,
            author: book.author,
            year: book.year,
            isComplete: book.isComplete
        });
        newBook[BookId] = book.id;

        book.isComplete
            ? finishShelf.append(newBook)
            : unFinishShelf.append(newBook);
    }
};

export {
    addBook,
    deleteBook,
    editBook,
    changeStatusBook,
    getValueInputModal,
    validationInput,
    makeErrorMessage,
    loadBook,
    BookId
};
