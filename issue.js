let issueIndex=-1;
function openIssueBookDialog(index) {
    issueIndex = index;
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let studentSelect = document.getElementById("studentSelect");
    studentSelect.innerHTML = students.map(s => `<option value="${s.id}">${s.name} (${s.id})</option>`).join("");
    document.getElementById("issueBookModal").style.display = "block";
}


function confirmIssue() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let students = JSON.parse(localStorage.getItem("students")) || [];
    
    if (issueIndex < 0 || issueIndex >= books.length) return;

    let book = books[issueIndex];
    if (book.available <= 0) {
        alert("Sorry, no copies are available to issue.");
        closeIssueBookDialog();
        return;
    }
    book.issued += 1;
    book.available -= 1;
    let studentId = document.getElementById("studentSelect").value;
    let student = students.find(s => s.id === studentId);
    let duration=document.getElementById("daysSelect").value;
    if (student) {
        student.issuedBooks.push({ title: book.title, author: book.author, duration});
    }
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("students", JSON.stringify(students));
    closeIssueBookDialog();
    loadBooks();
    loadStudents();
}

function closeIssuedBooksDialog() {
    document.getElementById("issuedBooksModal").style.display = "none";
}



function closeIssueBookDialog() {
    document.getElementById("issueBookModal").style.display = "none";
}