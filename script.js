const form = document.getElementById('form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookRecommend = document.getElementById('recommend');
const bookDeposit = document.getElementsByClassName('deposit');
const bookLibrary = document.getElementsByClassName('library');

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
    let newTitle = bookTitle.value;
    let newAuthor = bookAuthor.value;
    let newPages = bookPages.value;
    let newRead = document.querySelector('input[name="read"]:checked').value;
    let newRecommend = document.querySelector('input[name="recommend"]:checked').value;
    let newBook = new Book(newTitle, newAuthor, newPages, newRead, newRecommend)
    console.log(newBook);
    // store new Book object in myLibrary
}

form.addEventListener('submit', addBookToLibrary);