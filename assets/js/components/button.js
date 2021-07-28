import {
    makeErrorMessage,
    changeStatusBook,
    addBook,
    deleteBook,
    //     getValueInputModal,
    validationInput
    // editBook
} from './../books.js';
import { toggleModal } from './modal.js';

// NOTE: Membuat abstrak Button
const createButton = ({ className, eventListener, icon, idBtn, title }) => {
    const button = document.createElement('button');
    button.classList.add('btn', ...className);

    if (idBtn) button.setAttribute('id', idBtn);

    if (title) button.setAttribute('title', title);

    button.innerHTML = icon;
    button.addEventListener('click', event => {
        eventListener(event);
    });

    return button;
};

const getList = event => {
    let list;
    if (event.target.matches('button')) {
        list = event.target.parentElement.parentElement;
    }
    if (event.target.matches('i')) {
        list = event.target.parentElement.parentElement.parentElement;
    }

    return list;
};

// NOTE: Membuat button Finish
const finishButton = () =>
    createButton({
        className: ['btn-green', 'mr-3'],
        eventListener: event => {
            const list = getList(event);

            changeStatusBook(list, true);
        },
        icon: '<i class="bi bi-check-lg"></i>',
        title: 'Make Complete'
    });

// NOTE: Membuat button Delete
const deleteButton = () =>
    createButton({
        className: ['btn-red', 'ml-3'],
        eventListener: event => {
            const isDelete = confirm('Are you Sure delete this book?');
            if (isDelete) {
                const list = getList(event);
                deleteBook(list);
            }
        },
        icon: '<i class="bi bi-trash"></i>',
        title: 'Delete Book'
    });

// NOTE: Membuat button unfinish
const unFinishButton = () =>
    createButton({
        className: ['btn-grey', 'mr-3'],
        eventListener: event => {
            const list = getList(event);

            changeStatusBook(list, false);
        },
        icon: ' <i class="bi bi-dash-lg"></i>',
        title: 'Make UnComplete'
    });

//NoTE: Membuat button edit
const editButton = () =>
    createButton({
        className: ['btn-yellow', 'ml-3', 'mr-3'],
        eventListener: event => {
            // getValueInputModal(event.target.parentNode.parentNode);
            toggleModal();
        },
        icon: '<i class="bi bi-pencil-fill"></i>',
        title: 'Edit Book'
    });

//NOTE: Membuat button add book pada modal
const addNewBookBtn = () =>
    createButton({
        className: ['btn-main'],
        icon: 'Add Book',
        idBtn: 'addBookBtn',
        eventListener: () => {
            const { isValid, message, elem } = validationInput();
            if (!isValid) {
                makeErrorMessage(message, elem);
            } else {
                addBook();
                toggleModal();
            }
        }
    });

const editFormModalBtn = cardElement =>
    createButton({
        className: ['btn-yellow'],
        icon: 'Edit Book',
        eventListener: () => {
            if (validationInput()) {
                // editBook(cardElement);
                toggleModal();
            }
        }
    });
export {
    finishButton,
    deleteButton,
    unFinishButton,
    addNewBookBtn,
    editButton,
    editFormModalBtn
};
