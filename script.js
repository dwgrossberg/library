const depositBook = document.getElementById('deposit');
const removeBook = document.getElementById('remove');
const depositForm = document.getElementById('form-deposit');
const removeForm = document.getElementById('form-remove');
const readBook = document.querySelector('input[id="read"]');
const recommendLegend = document.getElementsByClassName('legend');
const recommendFieldset = document.getElementById('recommend');
const recommendImg = document.getElementById('recommend-img');
const recommendImgWrapper = document.getElementById('recommend-img-wrapper');
const recommend = document.querySelector('input[name="recommend"]');
const depositPseudoButton = document.getElementById('deposit-pseudo-button');
const depositBookButton = document.getElementById('deposit-book-button');
const librarian = document.querySelector('[src="img/Cartoon-Woman-With-Glasses.svg"]');
const library = document.getElementById('library');
const libraryBooks = document.getElementsByClassName('book');

let myLibrary = [];
let myLibraryHistory = [];
let myBooks = [];

function Book(title, author, pages, read, recommend) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.recommend = recommend;
}

// Default books on pageload
const book1 = new Book('Mirrors: Stories of Almost Everyone', 'Eduardo Galeano', 401, false);
const book2 = new Book('Henry and June', 'Anais Nin', 281, true, 'yes');
const book3 = new Book('Journey to the End of the Night', 'Louis-Ferdinand Céline', 464, true, 'maybe-so');
myBooks.push(book1, book2, book3);
myBooks.forEach(book => {
    myLibrary.push(book);
    displayLibrary();
});

// Create a new Book object and store it in the array myLibrary
function addBookToLibrary(e) {
    e.preventDefault();
    // store user-entered values
    let title = document.getElementById('deposit-title').value;
    let author = document.getElementById('deposit-author').value;
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
}

// Display books to the library and add html markup to the Book objects
function displayLibrary() {
    myLibrary.forEach((val, key, arr) => {
        if (Object.is(arr.length -1 , key)) {   //print last object in myLibrary to the display
            let bookArray = Object.values(val);
            let newBook = document.createElement('div');
            newBook.classList.add('book');
            newBook.setAttribute('id', myLibrary.indexOf(val));
            newBook.innerHTML = '<span class="delete-book">' + '</span>' + 
            '<h3>' + bookArray[0] + '</h3>' + 
            '<h4>' + bookArray[1] + '</h4>' + 
            '<h5>' + bookArray[2] + ' pages' + '</h5>' +
            bookArray[3] +
            '<div class="read-toggle">' + '<p>Have You Read the Book?</p>' +
            `<input type="checkbox" id="read${myLibrary.indexOf(val)}" name="checkbox" value="${bookArray[3]}">` +
            '<label for="read" class="toggle">' + '<p>Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</p>' + '</label>' + '</div>';
            bookArray[4];
            library.appendChild(newBook);
        } else return;
    })
}

depositForm.addEventListener('submit', addBookToLibrary);

// Display the form for depositing a book
function displayDepositBook() {
    if (window.getComputedStyle(depositForm).display === 'none' && window.getComputedStyle(removeForm).display === 'none') {
        depositForm.reset();
        recommendFieldset.style.display = '';
        depositForm.style.display = 'flex';
        recommendImgWrapper.style.display = 'none';
    } else if (window.getComputedStyle(depositForm).display === 'none' && window.getComputedStyle(removeForm).display === 'flex') {
        removeForm.style.display = '';
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

// Display the form for removing a book
function displayRemoveBook() {
    if (window.getComputedStyle(removeForm).display === 'none' && window.getComputedStyle(depositForm).display === 'none') {
        removeForm.reset();
        removeForm.style.display = 'flex';
    } else if (window.getComputedStyle(removeForm).display === 'none' && window.getComputedStyle(depositForm).display === 'flex') {
        depositForm.style.display = '';
        removeForm.reset();
        removeForm.style.display = 'flex';
    } else {
        removeForm.style.display = '';
    }
}

removeBook.addEventListener('mousedown', displayRemoveBook);

// Display the recommended book radio button input field
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

// Display the recommended thumb icon and match it with the corresponding value
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

// Loop through each recommended radio button to attach a change event
if (document.querySelector('input[name="recommend"]')) {
    document.querySelectorAll('input[name="recommend"]').forEach(elem => {
        elem.addEventListener('change', insertRecommendThumb)
    })
}

// Link the pseudoButton with the real form button
depositPseudoButton.addEventListener('mousedown', () => {
    depositBookButton.click();
})

// Remove Book object from the DOM & myLibrary array via click 
function removeBookByClick(e) {
    if (e.target && e.target.nodeName == 'SPAN') {
        let bookIndex = e.target.parentNode.id;
        let bookToDelete = document.getElementById(`${bookIndex}`);
        // save the deleted Book objects to a new array for later user
        myLibraryHistory.push({...myLibrary[bookIndex]});
        myLibrary[bookIndex] = undefined;
        console.log(myLibrary, myLibraryHistory);
        library.removeChild(bookToDelete);
    }
}

library.addEventListener('mousedown', removeBookByClick);

// Remove Book object from the DOM & myLibrary array via form 
function removeBookByForm(e) {
    e.preventDefault();
    // store user-entered values
    let titleToRemove = document.getElementById('remove-title').value;
    let authorToRemove = document.getElementById('remove-author').value;
    myLibrary.forEach(obj => {
        if (typeof obj === 'undefined') return;
        else {
            let values = Object.values(obj);
            if (values.includes(titleToRemove) && values.includes(authorToRemove)) {
                let objIndex = myLibrary.indexOf(obj);
                let bookToDelete = document.getElementById(`${objIndex}`);
                myLibraryHistory.push({...myLibrary[objIndex]});
                myLibrary[objIndex] = undefined;
                console.log(myLibrary, myLibraryHistory);
                library.removeChild(bookToDelete);
            }
        }
        removeForm.reset();
    });
}

removeForm.addEventListener('submit', removeBookByForm);

// Restore the deleted library Book objects to the DOM and myLibrary array
function restoreBooks() {
    myLibraryHistory.forEach(book => {
        myLibrary.push(book);
        displayLibrary()
        myLibraryHistory = [];
    })
}

librarian.addEventListener('mousedown', restoreBooks);

// Set read/not-read toggle checkbox on library Book objects 
Array.from(libraryBooks).forEach(book => {
    let toggleRead = document.querySelector(`input[id=read${book.id}]`);
    if (toggleRead.value === 'false') return;
    else {
        toggleRead.checked = true;
    }
});
