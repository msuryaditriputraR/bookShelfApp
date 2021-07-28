import { addNewBookBtn, editFormModalBtn } from './button.js';

const formModal = [
    { id: 'book-title', type: 'text', text: 'Title' },
    { id: 'book-author', type: 'text', text: 'Author' },
    { id: 'book-year', type: 'text', text: 'Year' },
    { id: 'book-iscompleted', type: 'checkbox', text: 'Is Completed' }
];

// NOTE: make an abstraction of modal
const makeModal = (inputModal, textHeader, { isEdit, listBookElement }) => {
    const headerContent = document.createElement('div');
    headerContent.classList.add('header-content');

    const titleHeader = document.createElement('h2');
    titleHeader.classList.add('title-header');
    titleHeader.textContent = textHeader;

    const btnClosed = document.createElement('span');
    btnClosed.className = 'btn-closed btn-red';
    btnClosed.innerHTML = '&times;';

    headerContent.append(titleHeader, btnClosed);

    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content');

    inputModal.forEach(input => {
        const formControl = document.createElement('div');
        formControl.classList.add('form-control');

        const labelModal = document.createElement('label');
        labelModal.setAttribute('for', input.id);
        labelModal.innerText = input.text;

        const inputModal = document.createElement('input');
        inputModal.setAttribute('type', input.type);
        inputModal.setAttribute('id', input.id);

        if (input.value) inputModal.value = input.value;
        if (input.id === 'book-iscompleted' && input.isChecked)
            inputModal.checked = input.isChecked;

        formControl.append(labelModal, inputModal);
        mainContent.append(formControl);
    });

    const footerContent = document.createElement('div');
    footerContent.className = 'footer-content';

    let btnModal;
    isEdit
        ? (btnModal = editFormModalBtn(listBookElement))
        : (btnModal = addNewBookBtn());

    footerContent.append(btnModal);

    const error = document.createElement('div');
    error.innerText = 'test error';
    error.classList.add('error', 'd-none');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    modalContent.append(headerContent, mainContent, error, footerContent);

    return modalContent;
};

// NOTE: Make add New Book Modal
const addBookModal = (inputModal, textHeader, isEdit) =>
    makeModal(inputModal, textHeader, isEdit);

// NOTE: Make Edit Book Modal
const editBookModal = (inputModal, textHeader, isEdit) => {
    modal.append(makeModal(inputModal, textHeader, isEdit));
};

// NOTE: Modal
const addBtnModal = document.querySelector('.add-btn-modal');

const modal = document.querySelector('.modal');

const toggleModal = () => {
    modal.classList.toggle('show');
    if (!modal.classList.contains('show')) {
        modal.querySelector('.modal-content').remove();
    }
};

document.addEventListener(
    'click',
    event => {
        const element = event.target;
        if (element.classList.contains('btn-closed')) {
            element.addEventListener(
                'click',
                () => {
                    toggleModal();
                },
                { once: true }
            );
        }
    },
    { capture: true }
);

addBtnModal.addEventListener('click', () => {
    const modalAddBook = addBookModal(formModal, 'Add New Book', {
        isEdit: false
    });
    modal.append(modalAddBook);
    toggleModal();
});

modal.addEventListener('click', event => {
    const elem = event.target;
    const input = modal.querySelectorAll('input');
    const error = modal.querySelector('.error');
    if (elem == modal) toggleModal();

    input.forEach(inp => {
        if (elem == inp) {
            inp.style.borderColor = '#cacaca';
            error.classList.replace('d-block', 'd-none');
        }
    });
});

export { toggleModal, formModal, editBookModal };
