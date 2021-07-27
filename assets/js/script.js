import { loadBook } from './books.js';
import './components/index.js';
import { isStorageExist, loadDataFromStorage } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    if (isStorageExist()) loadDataFromStorage();
});

document.addEventListener('ondataloaded', () => {
    loadBook();
});
