// Utility: Get users from storage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

//Utility: Save users
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        
        const users = getUsers();

        const existingUser = users.find(user => user.email === email)

        if (existingUser) {
            alert("Email already registered.");
            return;
        }
        
        users.push({ name, email, password });
        saveUsers(users);

        alert("Registration successful!");
        window.location.href = 'login.html';
    });
}

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const users = getUsers();

        const validUser = users.find(user => user.email === email && user.password === password)

        if (!validUser) {
            alert("Invalid Credentials");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(validUser));

        alert("Successful Login... redirecting");
        window.location.href = 'dashboard.html';
    });
}