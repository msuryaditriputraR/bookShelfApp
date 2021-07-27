// import { editBookModal, formModal } from './components/modal.js';
import makeList from './components/list.js';
import {
    books,
    composeTodoObject,
    findBook,
    updateDataToStorage
} from './data.js';

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

    console.log(cardBook);
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

    // NOTE: reset value input when add Button clicked
    title.value = '';
    author.value = '';
    year.value = '';
    isCompleted.checked = false;
};

const changeStatusBook = (listBook, status) => {
    const title = listBook.querySelector('.title-book').innerText;
    const subTitle = listBook.querySelector('.subtitle-book').innerText;
    const [author, year] = subTitle.split(' | ');

    const newList = makeList({ title, author, year, isComplete: status });

    status ? finishShelf.append(newList) : unFinishShelf.append(newList);

    deleteBook(listBook);
};

const deleteBook = listBook => {
    listBook.remove();
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

// const getValueInputModal = cardBookElement => {
//     const book = findBook(cardBookElement[BookId]);

//     const titleValue = book.title;
//     const authorValue = book.author;
//     const yearValue = book.year;
//     const isComplete = book.isComplete;

//     const valueObject = {
//         titleValue,
//         authorValue,
//         yearValue
//     };

//     const valueFormModal = [...formModal];

//     const arrValueFormModal = valueFormModal.map((input, index) => {
//         let newInput = Object.assign({}, input);

//         if (input.id === 'book-iscompleted') {
//             newInput.isChecked = isComplete;
//         } else {
//             for (const [i, val] of Object.keys(valueObject).entries()) {
//                 if (index === i) {
//                     newInput.value = valueObject[val];
//                 }
//             }
//         }

//         return newInput;
//     });

//     editBookModal(arrValueFormModal, 'Edit Book', {
//         isEdit: true,
//         cardElement: cardBookElement
//     });
// };

// const editBook = cardElement => {
//     const title = document.getElementById('book-title').value;
//     const author = document.getElementById('book-author').value;
//     const year = document.getElementById('book-year').value;
//     const isComplete = document.getElementById('book-iscompleted').checked;

//     const book = findBook(cardElement[BookId]);

//     book.title = title;
//     book.author = author;
//     book.year = year;

//     updateDataToStorage();
//     updateCardBook(cardElement, { isComplete });
// };

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
    // editBook,
    changeStatusBook,
    // getValueInputModal,
    validationInput,
    makeErrorMessage,
    loadBook,
    BookId
};
