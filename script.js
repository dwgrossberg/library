

const libraryRow = document.getElementsByClassName('library-row');


if (libraryRow.classList.contatins('empty')) return;
else { 
    let bookNum = Math.random(20,40);
    for (let i = 0, i < bookNum, i++) {
        let bookDiv = document.createElement('div');
        bookDiv.classList.add('book')
    }
}


