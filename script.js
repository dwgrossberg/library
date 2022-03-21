const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const recommend = document.getElementById('recommend');
const library = document.getElementsByClassName('library');

let myLibrary = [];

function Book() {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

function addBookToLibrary() {
    // intake user input
    // create new Book object
    // store new Book object in myLibrary
}