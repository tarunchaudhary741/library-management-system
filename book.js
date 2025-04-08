function openBookListDialog() {
    loadBooks(); // Load books before displaying
    document.getElementById("bookListModal").style.display = "block";
}

function closeBookListDialog() {
    document.getElementById("bookListModal").style.display = "none";
}

function removeBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
}

function addBook() {
    let title = document.getElementById("bookTitle").value.trim();
    let author = document.getElementById("bookAuthor").value.trim();
    let quantity = parseInt(document.getElementById("bookQuantity").value.trim());
    
    if (!title || !author || isNaN(quantity) || quantity <= 0) {
        alert("Please enter valid book details.");
        return;
    }
    
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push({ title, author, total: quantity, issued: 0, available: quantity });
    localStorage.setItem("books", JSON.stringify(books));
    
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookQuantity").value = "";
    
    loadBooks(); // Refresh the book list after adding a new book
}



document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById("searchBookModal");

    // Listen for the input event and trigger the searchBooksModal function
    searchInput.addEventListener("input", searchBooksModal);
});

function searchBooksModal() {
    let searchTerm = document.getElementById("searchBookModal").value.toLowerCase(); // Get the search term
    let books = JSON.parse(localStorage.getItem("books")) || [];

    // Filter books based on the title or author matching the search term
    let filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );

    // Display the filtered books
    displayBooks(filteredBooks);
}

function displayBooks(books) {
    let booksList = document.getElementById("modalBookList");
    booksList.innerHTML = "";  

    
    books.forEach((book, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.total}</td>
            <td>${book.issued}</td>
            <td>${book.available}</td>
            <td><button onclick="openIssueBookDialog(${index})">Issue</button></td>
            <td><button onclick="removeBook(${index})">Remove</button></td>
        `;
        booksList.appendChild(tr);
    });
}