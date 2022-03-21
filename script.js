const form = document.getElementById('form-deposit');
const library = document.getElementById('library');

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
    let recommed = document.querySelector('input[name="recommend"]:checked').value;
    let book = new Book(title, author, pages, read, recommed)
    // store the new Book object to myLibrary
    myLibrary.push(book);
    console.log(book, myLibrary);
    // add the new Book object to the library DOM
    let newBook = document.createElement('div');
    newBook.classList.add('book');
    let newTitle = document.createElement('h3');
    newTitle.textContent = title;
    let newAuthor = document.createElement('h4');
    newAuthor.textContent = author;

    newBook.appendChild(newTitle);
    newBook.appendChild(newAuthor);


    library.appendChild(newBook);
    

}

form.addEventListener('submit', addBookToLibrary);