import { showCardSearch } from './card.js';

const searchBox = document.querySelector('.input-search');
let value = [];

searchBox.addEventListener('keyup', function () {
    value.unshift(this.value);
    showCardSearch(this.value);
});

export default value;
