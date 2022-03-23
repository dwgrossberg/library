const depositBook = document.getElementById('deposit');
const depositForm = document.getElementById('form-deposit');
const readBook = document.querySelector('input[id="read"]');
const recommendBook = document.getElementById('recommend');
const library = document.getElementById('library');
const libraryBook = document.getElementsByClassName('book');

let myLibrary = [];
let myBooks = [];

function Book(title, author, pages, read, recommend) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.recommend = recommend;
}

const book1 = new Book('Mirrors: Stories of Almost Everyone', 'Eduardo Galeano', 401, 'no');
const book2 = new Book('Henry and June', 'Anais Nin', 281, 'yes', 'yes');
const book3 = new Book('Journey to the End of the Night', 'Louis-Ferdinand Céline', 464, 'yes', 'maybe-so');
myBooks.push(book1, book2, book3);
myBooks.forEach(book => {
    myLibrary.push(book);
    displayLibrary();
})

function addBookToLibrary(e) {
    e.preventDefault();
    // store user values
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = readBook.value;
    if (read === 'checked') {
        let recommend = document.querySelector('input[name="recommend"]:checked').value;
    }
    let book = new Book(title, author, pages, read, recommend)
    // store the new Book object to myLibrary
    myLibrary.push(book);
    console.log(book, myLibrary);
    // add the new Book object to the library DOM
    depositForm.reset();
    displayLibrary();
}

function displayLibrary() {
    myLibrary.forEach((val, key, arr) => {
        if (Object.is(arr.length -1 , key)) {
            let bookArray = Object.values(val);
            let newBook = document.createElement('div');
            newBook.classList.add('book');
            newBook.dataset.number = myLibrary.indexOf(val);
            newBook.innerHTML = '<h3>' + bookArray[0] + '</h3>' + '<h4>' + bookArray[1] + '</h4>' + '<h5>' + bookArray[2] + '</h5>' + bookArray[3] + bookArray[4];
            library.appendChild(newBook);
        } else return;
    })
}

depositForm.addEventListener('submit', addBookToLibrary);

function displayDepositBook() {
    if (window.getComputedStyle(depositForm).display === 'none') {
        depositForm.style.display = 'flex';
    } else {
        depositForm.style.display = '';
    }

}

depositBook.addEventListener('mousedown', displayDepositBook);

function displayRecommendBook() {
    if (window.getComputedStyle(recommendBook).display === 'none') {
        recommendBook.style.display = 'flex';
    } else {
        recommendBook.style.display = '';
    }
}

readBook.addEventListener('change', displayRecommendBook);