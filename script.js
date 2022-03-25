const depositBook = document.getElementById('deposit');
const depositForm = document.getElementById('form-deposit');
const readBook = document.querySelector('input[id="read"]');
const recommendLegend = document.getElementsByClassName('legend');
const recommendFieldset = document.getElementById('recommend');
const recommendImg = document.getElementById('recommend-img');
const recommendImgWrapper = document.getElementById('recommend-img-wrapper');
const recommend = document.querySelector('input[name="recommend"]');
const depositPseudoButton = document.getElementById('deposit-pseudo-button');
const depositPseudoButtonText = document.getElementById('deposit-pseudo-button-text');
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

const book1 = new Book('Mirrors: Stories of Almost Everyone', 'Eduardo Galeano', 401, false);
const book2 = new Book('Henry and June', 'Anais Nin', 281, true, 'yes');
const book3 = new Book('Journey to the End of the Night', 'Louis-Ferdinand Céline', 464, true, 'maybe-so');
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
    let read;
    if (readBook.checked) {
        read = 'true';
    } else {
        read = readBook.value;
    }
    let recommend;
    if (read === 'true') {
        recommend = document.querySelector('input[type=radio]:checked').value;
    } else {
        recommend = 'undefined';
    }
    let book = new Book(title, author, pages, read, recommend);
    // store the new Book object to myLibrary
    myLibrary.push(book);
    console.log(book, myLibrary);
    // add the new Book object to the library DOM
    depositForm.reset();
    displayLibrary();
    depositForm.style.display = '';
    recommendBook.style.display = '';
}

function displayLibrary() {
    myLibrary.forEach((val, key, arr) => {
        if (Object.is(arr.length -1 , key)) {
            let bookArray = Object.values(val);
            let newBook = document.createElement('div');
            newBook.classList.add('book');
            newBook.dataset.number = myLibrary.indexOf(val);
            newBook.innerHTML = '<h3>' + bookArray[0] + '</h3>' + '<h4>' + bookArray[1] + '</h4>' + '<h5>' + bookArray[2] + ' pages' + '</h5>' + '<div id="read-in-book">' + '<span class="read-in-book-toggle">' + bookArray[3] + '</span>' + '</div>' + bookArray[4];
            library.appendChild(newBook);
        } else return;
    })
}

depositForm.addEventListener('submit', addBookToLibrary);

function displayDepositBook() {
    if (window.getComputedStyle(depositForm).display === 'none') {
        depositForm.reset();
        recommendFieldset.style.display = '';
        depositForm.style.display = 'flex';
        recommendImgWrapper.style.display = 'none';
    } else {
        depositForm.style.display = '';
        recommendImgWrapper.style.display = 'flex';
    }

}

depositBook.addEventListener('mousedown', displayDepositBook);

function displayRecommendBook() {
    if (window.getComputedStyle(recommendFieldset).display === 'none') {
        recommendImgWrapper.style.display = 'flex';
        recommendFieldset.style.display = 'flex';
    } else {
        recommendImgWrapper.style.display = 'none';
        recommendFieldset.style.display = '';
        recommendImg.src = '';
        recommendImg.style.opacity = 0;
        if (document.querySelector('input[name="recommend"]:checked')) {
            document.querySelector('input[name="recommend"]:checked').checked = false;
        }
    }
}

readBook.addEventListener('change', displayRecommendBook);

function insertRecommendThumb() {
    let recommendedBook = document.querySelector('input[name="recommend"]:checked');
    if (recommendedBook.value === 'yes') {
        recommendImg.src = 'img/thumb-up-outline.png';
        recommendImg.style.opacity = 1;
    } else if (recommendedBook.value === 'no') {
        recommendImg.src = 'img/thumb-down-outline.png';
        recommendImg.style.opacity = 1;
    } else if (recommendedBook.value === 'maybe-so') {
        recommendImg.src = 'img/thumbs-up-down-outline.png';
        recommendImg.style.opacity = 1;
    } else {
        recommendImg.src = '';
        recommendImg.style.opacity = 0;
    }
}

if (document.querySelector('input[name="recommend"]')) {
    document.querySelectorAll('input[name="recommend"]').forEach(elem => {
        elem.addEventListener('change', insertRecommendThumb)
    })
}






