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

const showListSearch = keyword => {
    const regex = new RegExp(keyword, 'ig');
    const lists = document.querySelectorAll('.list');
    lists.forEach(list => {
        const nameBook = list.querySelector('.title-book');
        const nameBookText = nameBook.innerText.toLowerCase();
        const subtitle = list.querySelector('.subtitle-book');
        const subtitleText = subtitle.innerText.toLowerCase();

        const macthKeyword = `<span class='hl'>${keyword.toLowerCase()}</span>`;
        if (nameBookText.match(regex) || subtitleText.match(regex))
            list.style.display = 'flex';
        else list.style.display = 'none';

        if (nameBookText.match(regex) && keyword) {
            const name = nameBookText.replace(regex, macthKeyword);
            nameBook.innerHTML = name;
        } else {
            nameBook.innerHTML = nameBookText;
        }

        if (subtitleText.match(regex) && keyword) {
            const textSubtitle = subtitleText.replace(regex, macthKeyword);
            subtitle.innerHTML = textSubtitle;
        } else {
            subtitle.innerHTML = subtitleText;
        }
    });
};

export { makeList, updateListBook, showListSearch };
