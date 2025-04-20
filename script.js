// Get form elements and student table body
const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("studentName");
const idInput = document.getElementById("studentId");
const emailInput = document.getElementById("emailId");
const contactInput = document.getElementById("contactNo");
const tableBody = document.getElementById("studentTableBody");

// Load existing student data from localStorage (if any)
let students = JSON.parse(localStorage.getItem("students")) || [];

// Function to render all student records in the table
function renderTable() {
  tableBody.innerHTML = ""; // Clear existing rows

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    // Create a table row for each student record
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row); // Add row to the table
  });
}

// Save updated students array to localStorage
function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Handle form submission for adding or updating a student
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  // Trim values to avoid empty space issues
  const name = nameInput.value.trim();
  const id = idInput.value.trim();
  const email = emailInput.value.trim();
  const contact = contactInput.value.trim();

  // Basic validation (HTML5 handles formatting)
  if (!name || !id || !email || !contact) {
    alert("All fields are required!");
    return;
  }

  // Add new student object to array
  students.push({ name, id, email, contact });

  saveToLocalStorage(); // Persist data
  renderTable();        // Refresh display
  form.reset();         // Clear form
});

// Edit a student entry by populating the form with existing data
window.editStudent = function (index) {
  const student = students[index];

  // Fill input fields with existing values
  nameInput.value = student.name;
  idInput.value = student.id;
  emailInput.value = student.email;
  contactInput.value = student.contact;

  // Remove existing entry (will be re-added on submit)
  students.splice(index, 1);
  saveToLocalStorage();
  renderTable();
};

// Delete student record at the specified index
window.deleteStudent = function (index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1); // Remove from array
    saveToLocalStorage();      // Update localStorage
    renderTable();             // Refresh table
  }
};

// Render existing data on initial page load
document.addEventListener("DOMContentLoaded", renderTable);
