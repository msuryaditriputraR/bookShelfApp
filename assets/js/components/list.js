import { BookId, changeStatusBook } from '../books.js';
import { findBook } from '../data.js';
import {
    deleteButton,
    editButton,
    finishButton,
    unFinishButton
} from './button.js';

const makeList = ({ title, author, year, isComplete }) => {
    const titleBook = document.createElement('h3');
    titleBook.innerText = title;
    titleBook.classList.add('title-book');

    const subtitleBook = document.createElement('p');
    subtitleBook.innerText = `${author} | ${year}`;
    subtitleBook.classList.add('subtitle-book');

    const left = document.createElement('div');
    left.classList.add('left');
    left.append(titleBook, subtitleBook);

    const right = document.createElement('div');
    right.classList.add('right');

    isComplete ? right.append(unFinishButton()) : right.append(finishButton());

    right.append(editButton(), deleteButton());

    const list = document.createElement('div');
    list.classList.add('list');
    list.append(left, right);

    return list;
};

const updateListBook = listBookElement => {
    const title = listBookElement.querySelector('.title-book');
    const subTitle = listBookElement.querySelector('.subtitle-book');

    const newList = findBook(listBookElement[BookId]);

    title.innerText = newList.title;
    subTitle.innerText = `${newList.author} | ${newList.year}`;

    changeStatusBook(listBookElement, newList.isComplete);
};

export { makeList, updateListBook };
