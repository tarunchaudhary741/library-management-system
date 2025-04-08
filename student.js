function openStudentListDialog() {
    loadStudents();
    document.getElementById("studentListModal").style.display = "block";
}

function closeStudentListDialog() {
    document.getElementById("studentListModal").style.display = "none";
}

function addStudent() {
    let name = document.getElementById("studentName").value.trim();
    let id = document.getElementById("studentId").value.trim();
    
    if (!name || !id) {
        alert("Please enter valid student details.");
        return;
    }
    
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ name, id, issuedBooks: [] }); // Add issuedBooks array to each student
    localStorage.setItem("students", JSON.stringify(students));
    
    document.getElementById("studentName").value = "";
    document.getElementById("studentId").value = "";
    loadStudents();
}




function removeStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}