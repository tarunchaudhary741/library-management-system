function viewIssuedBooks(studentIndex) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let student = students[studentIndex];
    let issuedBooksList = document.getElementById("issuedBooksList");
    
    issuedBooksList.innerHTML = ""; // Clear current list

    // Loop through the student's issued books and display them
    student.issuedBooks.forEach((book,idx)=> {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.duration}</td>
            <td><button onclick="returnbook(${studentIndex},${idx})">Return book</button></td>
        `;
        issuedBooksList.appendChild(row);
    });

    document.getElementById("issuedBooksModal").style.display = "block";
}

function returnbook(studentIndex, bookIndex) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let books = JSON.parse(localStorage.getItem("books")) || [];

    let student = students[studentIndex];
    if (!student || !Array.isArray(student.issuedBooks)) return;

    let returnedBook = student.issuedBooks[bookIndex];

    // Remove book from issuedBooks
    student.issuedBooks.splice(bookIndex, 1);

    // Update the book's availability in the main books list
    let bookToUpdate = books.find(book => book.title === returnedBook.title && book.author === returnedBook.author);
    if (bookToUpdate) {
        bookToUpdate.available += 1;
        bookToUpdate.issued = Math.max(bookToUpdate.issued - 1, 0); // Prevent negative values
    }

    // Save updated data back to localStorage
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("books", JSON.stringify(books));

    // Refresh UI
    viewIssuedBooks(studentIndex);
    loadBooks(); // Update book availability in the book list
    loadStudents(); // Optional: refresh students list if needed
}
