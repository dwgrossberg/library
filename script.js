const depositBook = document.getElementById('deposit');
const removeBook = document.getElementById('remove');
const depositForm = document.getElementById('form-deposit');
const removeForm = document.getElementById('form-remove');
const readBookForm = document.querySelector('input[id="read"]');
const recommendLegend = document.getElementsByClassName('legend');
const recommendFieldset = document.getElementById('recommend-fieldset');
const recommendImg = document.getElementById('recommend-img');
const recommendImgWrapper = document.getElementById('recommend-img-wrapper');
const depositPseudoButton = document.getElementById('deposit-pseudo-button');
const depositBookButton = document.getElementById('deposit-book-button');
const librarian = document.querySelector('[src="img/Cartoon-Woman-With-Glasses.svg"]');
const library = document.getElementById('library');
const libraryBooks = document.getElementsByClassName('book');
const deleteBooks = document.getElementsByClassName('delete-book');

let myLibrary = [];
let myLibraryHistory = [];
let myBooks = [];

// Book Object constructor
function Book(title, author, pages, read, recommend) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.recommend = recommend; 
    this.isRead = function() {
        if (this.read === false) {
            this.read = true;
        } else {
            this.read = false;
        }
    }
    this.isRecommended = function(e) {
        if (e === 'yes') {
            this.recommend = 'yes';
        } else if (e === 'no') {
            this.recommend = 'no';
        } else if (e === 'maybeSo') {
            this.recommend = 'maybeSo';
        }
    }
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
    if (readBookForm.checked) {
        read = true;
    } else {
        read = false;
    }
    let recommend;
    if (read === true) {
        recommend = document.querySelector('input[name="recommend"]:checked').value;
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
    recommendImg.style.opacity = 0;
}

// Display books to the library and add html markup to the Book objects
function displayLibrary() {
    myLibrary.forEach((val, key, arr) => {
        if (Object.is(arr.length -1 , key)) {   //print last object in myLibrary to the display
            let bookArray = Object.values(val);
            let newBook = document.createElement('div');
            newBook.classList.add('book');
            newBook.setAttribute('id', myLibrary.indexOf(val));
            // HTML markup for Book objects displayed in the library
            newBook.innerHTML = 
            '<span class="delete-Book">' + '</span>' + 
            `<span id="recommend-status-Book${myLibrary.indexOf(val)}">` + '</span>' +
            '<h3>' + bookArray[0] + '</h3>' + 
            '<h4>' + bookArray[1] + '</h4>' + 
            '<h5>' + bookArray[2] + ' pages' + '</h5>' +
            // Toggle Book readStatus
            '<div class="read-toggle">' + 
                '<p>Have You Read the Book?</p>' +
                `<input type="checkbox" id="readInput${myLibrary.indexOf(val)}" name="checkbox" value="${bookArray[3]}">` +
                `<label for="read" class="toggle" id="readLabel${myLibrary.indexOf(val)}">` + '<p>Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</p>' + '</label>' + 
            '</div>' +
            // Toggle Book recommendedStatus
            `<div id="recommend-wrapper-Book${myLibrary.indexOf(val)}">` +
                `<fieldset id="recommend-fieldset-Book${myLibrary.indexOf(val)}">` +
                '<div class="legend">' +
                    '<legend>Would You Recommend it to a Friend?</legend>' +
                '</div>' +
                '<div class="radio-wrapper">' + 
                    `<label for="yes-Book${myLibrary.indexOf(val)}" class="label yes">` +
                        `<input type="radio" id="yes-Book${myLibrary.indexOf(val)}" name="recommend-Book${myLibrary.indexOf(val)}" class="recommend-in-Book yes">` +
                        '<span class="radio-button-Book yes">' + '</span>' + 'Yes' +
                    '</label>' +
                    `<label for="no-Book${myLibrary.indexOf(val)}" class="label no">` +
                        `<input type="radio" id="no-Book${myLibrary.indexOf(val)}" name="recommend-Book${myLibrary.indexOf(val)}" class="recommend-in-Book no">` +
                        '<span class="radio-button-Book no">' + '</span>' + 'No' +
                    '</label>' +
                    `<label for="maybe-so-Book${myLibrary.indexOf(val)}" class="label maybeSo">` +
                        `<input type="radio" id="maybe-so-Book${myLibrary.indexOf(val)}" name="recommend-Book${myLibrary.indexOf(val)}" class="recommend-in-Book maybeSo">` +
                        '<span class="radio-button-Book maybeSo">' + '</span>' + 'Maybe So' +
                    '</label>' +
                '</div>' +
                '</fieldset>' +
            '</div>';

            library.appendChild(newBook);
            setBookReadToggle();

            // Toggle readStatus on book objects through the DOM
            let toggleReadInput = document.querySelector(`input[id="readInput${myLibrary.indexOf(val)}"]`);
            let toggleReadLabel = document.querySelector(`label[id="readLabel${myLibrary.indexOf(val)}"]`);
            toggleReadLabel.addEventListener('mousedown', () => {
                if (toggleReadInput.checked === true) {
                    toggleReadInput.checked = false;
                    toggleReadInput.value = false;
                    myLibrary[`${myLibrary.indexOf(val)}`].isRead();
                    console.log(myLibrary[`${myLibrary.indexOf(val)}`].read);
                } else {
                    toggleReadInput.checked = true;
                    toggleReadInput.value = true;
                    myLibrary[`${myLibrary.indexOf(val)}`].isRead();
                    console.log(myLibrary[`${myLibrary.indexOf(val)}`].read);
                }
            });

            // Update the recommendedBook status based on Book object
            let recommendYes = document.querySelector(`input[id="yes-Book${myLibrary.indexOf(val)}"`);
            let recommendNo = document.querySelector(`input[id="no-Book${myLibrary.indexOf(val)}"`);
            let recommendMaybeSo = document.querySelector(`input[id="maybe-so-Book${myLibrary.indexOf(val)}"`);
            if (bookArray[4] === 'yes') {
                recommendYes.checked = true;
            } else if (bookArray[4] === 'no') {
                recommendNo.checked = true;
            } else if (bookArray[4] === 'maybeSo') {
                recommendMaybeSo.checked = true;
            }

            // Toggle recommendedStatus on book objects through the DOM
            let recommendYesLabel = document.querySelector(`label[for="yes-Book${myLibrary.indexOf(val)}"`);
            let recommendNoLabel = document.querySelector(`label[for="no-Book${myLibrary.indexOf(val)}"`);
            let recommendMaybeSoLabel = document.querySelector(`label[for="maybe-so-Book${myLibrary.indexOf(val)}"`);
            let labels = [recommendYesLabel, recommendNoLabel, recommendMaybeSoLabel];
            labels.forEach(label => label.addEventListener(('mousedown'), (e) => {
                myLibrary[`${myLibrary.indexOf(val)}`].isRecommended(e.target.classList[1]);
                console.log(myLibrary[`${myLibrary.indexOf(val)}`].recommend);
            }));

            // And update the thumb icon on top left of Book objects
            let recommends = [recommendYes, recommendNo, recommendMaybeSo];
            let thumbIcon = document.getElementById(`recommend-status-Book${myLibrary.indexOf(val)}`);
            if (recommendYes.checked === true) {
                thumbIcon.style.backgroundImage = 'url("/img/thumb-up-outline.png")';
            } else if (recommendNo.checked === true) {
                thumbIcon.style.backgroundImage = 'url("img/thumb-down-outline.png")';
            } else if (recommendMaybeSo.checked === true) {
                thumbIcon.style.backgroundImage = 'url("img/thumbs-up-down-outline.png")';
            }
            // Dynamically add event listeners to new Book objects
            recommends.forEach(elem => elem.addEventListener('change', () => {
                if (recommendYes.checked === true) {
                    thumbIcon.style.backgroundImage = 'url("/img/thumb-up-outline.png")';
                } else if (recommendNo.checked === true) {
                    thumbIcon.style.backgroundImage = 'url("img/thumb-down-outline.png")';
                } else if (recommendMaybeSo.checked === true) {
                    thumbIcon.style.backgroundImage = 'url("img/thumbs-up-down-outline.png")';
                }
            }));
            


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

readBookForm.addEventListener('change', displayRecommendBook);

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
    if (e.target && e.target.classList[0] == 'delete-Book') {
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
        displayLibrary();
        myLibraryHistory = [];
    })
}

librarian.addEventListener('mousedown', restoreBooks);

// Set read/not-read toggle checkbox on library Book objects to correspond with value
function setBookReadToggle() {
    Array.from(libraryBooks).forEach(book => {
        let toggleReadInput = document.querySelector(`input[id="readInput${book.id}"]`);
        if (toggleReadInput.value === 'false') return;
        else {
            toggleReadInput.checked = true;
        }    
    });
}

            