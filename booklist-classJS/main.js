class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }   
}
class UI{
    addBook(book){
        const list = document.getElementById("book-list");
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row);
    }
    showAlert(masssege,cName){
        const error = document.createElement("span");
        error.innerHTML = masssege;
        error.className = cName;
        error.classList.add("e-alert");
        const container = document.querySelector(".card-body");
        const afterItem = document.getElementById("book-form");

        container.insertBefore(error,afterItem);
        setTimeout(() => {
            document.querySelector(".e-alert").classList.add("fade-Out");;
        }, 3000);
        setTimeout(() => {
            document.querySelector(".e-alert").remove();
        }, 3200);
    }
    deleteBook(target){
        if(target.className == "delete"){
            target.parentElement.parentElement.remove();
            const isbn = target.parentElement.previousElementSibling.textContent;
            storeBook.removeBook(isbn);
        }
    }
}

class storeBook{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static setBook(book){
        let books = storeBook.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbm){
        let books = storeBook.getBook();
        books.forEach((book,index) => {
            if(book.isbn === isbm){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
    static showBooks(){
        let books = storeBook.getBook();
        books.forEach((book) => {
            const ui = new UI;
            ui.addBook(book);
        });
    }
}
storeBook.showBooks();
document.getElementById('book-form').addEventListener('submit',function(e){

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);


    const ui = new UI();
    if((title == "" || title.replace(/\s+/g, '').length == 0) 
    || (author == "" || author.replace(/\s+/g, '').length == 0) 
    || (isbn == "" || isbn.replace(/\s+/g, '').length == 0)){
        ui.showAlert("pls write something here!!!", "bg-red");
    }else{
        ui.addBook(book);
        storeBook.setBook(book);
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
        ui.showAlert("Book added", "bg-green");
    }
    e.preventDefault();
});
document.getElementById("book-list").addEventListener("click",function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert("Book deleted", "bg-green");
    e.preventDefault();
});