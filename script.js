const form = document.getElementById('form-deposit');
const library = document.getElementById('library');
const libraryBook = document.getElementsByClassName('book');

let myLibrary = [];

function Book(title, author, pages, read, recommend) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.recommend = recommend;
}

function addBookToLibrary(e) {
    e.preventDefault();
    // store user values
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.querySelector('input[name="read"]:checked').value;
    let recommend = document.querySelector('input[name="recommend"]:checked').value;
    let book = new Book(title, author, pages, read, recommend)
    // store the new Book object to myLibrary
    myLibrary.push(book);
    console.log(book, myLibrary);
    // add the new Book object to the library DOM
    displayLibrary();
    form.reset();
}

function displayLibrary() {
    myLibrary.forEach(book => {

        let bookArray = Object.values(book);
        let newBook = document.createElement('div');
        newBook.classList.add('book');
        newBook.dataset.number = myLibrary.indexOf(book);
        console.log(newBook.dataset.number);
        newBook.innerText = bookArray;
        library.appendChild(newBook);
    })
}

form.addEventListener('submit', addBookToLibrary);