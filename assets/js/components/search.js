const searchBox = document.querySelector('.input-search');
let value = [];

searchBox.addEventListener('keyup', function () {
    value.unshift(this.value);
    showListSearch(this.value);
});

export default value;
