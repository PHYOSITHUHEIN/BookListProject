//ES6 Class style
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    addBookToList(book){
        //Create Variable for book list
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        //Insert Values to table rows
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>X</a></td>
        `
        //Append to List
        list.appendChild(row);   

    }
    showAlert(message,className){
        //Create Div
        const div = document.createElement('div');
        //Add class to div
        div.className = `alert ${className}`;
        //Addd Text
        div.appendChild(document.createTextNode(message));
        //Get Parents
        const container = document.querySelector('.container');
        //Get Form
        const form = document.querySelector('#book-form');
        //Insert div before form
        container.insertBefore(div,form);

        //Disappear After 3s
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },2000);
    }
    deleteBook(target){
            if(target.className === 'delete'){
                target.parentElement.parentElement.remove();
            }
    }
    clearField(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
//Create LocalStorage Class
class store{
   static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
    return books;
    }
   static displayBook(){
       const books = store.getBook();
       books.forEach(function(book){
           const ui = new UI();
           //Add book to ui
           ui.addBookToList(book);
       });

    }
    static addBook(book){
        const books = store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = store.getBook();
        console.log(books);
        books.forEach(function(book,index){
            if(book.isbn === isbn){ 
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
//DOM Load Event
document.addEventListener('DOMContentLoaded',store.displayBook());
//Add EventListener to add book
document.getElementById('book-form').addEventListener('submit',function(e){
    //Create Variables for form values
    const title = document.getElementById('title').value;
          author = document.getElementById('author').value;
          isbn = document.getElementById('isbn').value;
    //Instantiate the Book Constructor
    const book = new Book(title,author,isbn);
    //Instantiate the UI constructor
    const ui = new UI();
    //Validation
    if(title === '' || author === '' || isbn=== ''){
        ui.showAlert('Please Fill In all fields','error');
    }else{
        //Add Book to list
        ui.addBookToList(book);
        //Add book to local storage
        store.addBook(book);
        //Showing success alert
        ui.showAlert('Book added successfully','success');
        //Clear field
        ui.clearField();
        }
    e.preventDefault();
});
//Add EventListener to delete book
document.getElementById('book-list').addEventListener('click',function(e){
    //Instantiate the ui constructor
    const ui = new UI();
    //Delete the row
    ui.deleteBook(e.target);
    //Delete from the localstorage
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //Show green bar to prove delete
    ui.showAlert('Deleted Book','success');
    e.preventDefault();
})
