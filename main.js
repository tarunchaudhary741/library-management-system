document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
    loadStudents();
});

function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let modalBookList = document.getElementById("modalBookList");
    modalBookList.innerHTML = "";
    books.forEach((book, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.total}</td>
            <td>${book.issued}</td>
            <td>${book.available}</td>
            <td><button onclick="openIssueBookDialog(${index})">issue</button></td>
            <td><button onclick="removeBook(${index})">Remove</button></td>
        `;
        modalBookList.appendChild(row);
    });
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let modalStudentList = document.getElementById("modalStudentList");
    modalStudentList.innerHTML = "";
    
    students.forEach((student, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${Array.isArray(student.issuedBooks) ? student.issuedBooks.length : 0}</td> <!-- Display number of issued books -->
            <td><button onclick="removeStudent(${index})">Remove</button></td>
            <td><button onclick="viewIssuedBooks(${index})">View Issued Books</button></td>
        `;
        modalStudentList.appendChild(row);
    });
}
