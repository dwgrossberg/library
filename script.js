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
    let newTitle = document.getElementById('title').value;
    let newAuthor = document.getElementById('author').value;
    let newPages = document.getElementById('pages').value;
    let newRead = document.querySelector('input[name="read"]:checked').value;
    let newRecommend = document.querySelector('input[name="recommend"]:checked').value;
    let newBook = new Book(newTitle, newAuthor, newPages, newRead, newRecommend)
    // store the new Book object to myLibrary
    myLibrary.push(newBook);
    console.log(newBook, myLibrary);
    // add the new Book object to the library DOM
    let fragment = document.createDocumentFragment();
    let h3 = document.createElement('h3');
    h3.textContent = newTitle;
    fragment.appendChild(h3);
    library.appendChild(fragment);
    

}

form.addEventListener('submit', addBookToLibrary);