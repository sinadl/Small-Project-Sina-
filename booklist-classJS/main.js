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
        <td><a href="#">X</a></td>
        `
        list.appendChild(row);
    }
}

document.getElementById('book-form').addEventListener('submit',function(e){

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);


    const ui = new UI();

    ui.addBook(book);

    e.preventDefault();
})