import {
    makeErrorMessage,
    //     changeBookToCompleted,
    //     changeBookToUnCompleted,
    addBook,
    //     getValueInputModal,
    validationInput
    // editBook
} from './../books.js';
import { toggleModal } from './modal.js';

// NOTE: Membuat abstrak Button
const createButton = ({ className, eventListener, icon, idBtn }) => {
    const button = document.createElement('button');
    button.classList.add('btn', ...className);

    if (idBtn) button.setAttribute('id', idBtn);

    button.innerHTML = icon;
    button.addEventListener('click', event => {
        eventListener(event);
    });

    return button;
};

//
//         <button class="btn btn-red">
//
//         </button>

// NOTE: Membuat button Finish
const finishButton = () =>
    createButton({
        className: ['btn-green', 'mr-3'],
        eventListener: event => {
            // changeBookToCompleted(event.target.parentElement.parentElement);
        },
        icon: '<i class="bi bi-check-lg"></i>'
    });

// NOTE: Membuat button Delete
const deleteButton = () =>
    createButton({
        className: ['btn-red', 'ml-3'],
        eventListener: event => {
            // const isDelete = confirm('Are you Sure delete this book?');
            // if (isDelete)
            // deleteCardBook(event.target.parentElement.parentElement);
        },
        icon: '<i class="bi bi-trash"></i>'
    });

// NOTE: Membuat button unfinish
const unFinishButton = () =>
    createButton({
        className: ['btn-grey', 'mr-3'],
        eventListener: event => {},
        // changeBookToUnCompleted(event.target.parentNode.parentNode)
        icon: ' <i class="bi bi-dash-lg"></i>'
    });

//NoTE: Membuat button edit
const editButton = () =>
    createButton({
        className: ['btn-yellow', 'ml-3', 'mr-3'],
        eventListener: event => {
            // getValueInputModal(event.target.parentNode.parentNode);
            toggleModal();
        },
        icon: '<i class="bi bi-pencil-fill"></i>'
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
        textBtn: 'Edit Book',
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
