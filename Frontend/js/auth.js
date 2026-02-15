// Utility: Get users from storage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

//Utility: Save users
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Utility: Show error
function showError(input, message) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  input.classList.add("error");
}

// Utility: Clear error
function clearError(input) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = "";
  input.classList.remove("error");
}

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password strength
function isStrongPassword(password) {
  return password.length >= 6;
}

// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("regName");
    const email = document.getElementById("regEmail");
    const password = document.getElementById("regPassword");
      
    let isValid = true;
      
    clearError(name);
    clearError(email);
    clearError(password);

    if (name.value.trim() === "") {
      showError(name, "Name is required");
      isValid = false;
    }

    if (!isValidEmail(email.value.trim())) {
      showError(email, "Email is not valid")
    } 

    if (!isStrongPassword(password)) {
      showError(password, "password must be at least 6 characters");
    }

    if (!isValid) return;

    const users = getUsers();

    const existingUser = users.find(user => user.email === email)
        
      
    if (existingUser) {
      showError(email, "Email is Already Registered")
      return;
    }
        
    users.push({
      name: name,
      email: email,
      password: password
    });

    saveUsers(users);

    window.location.href = 'Dashboard.html';
  });
}

const loginForm = document.getElementById("loginform");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    const small = document.getElementsByTagName("small");

    let isValid = true;

    clearError(email);
    clearError(password);

    if (!isValidEmail(email.value.trim())) {
      showError(email, "Email is not valid");
      return isValid = false;
    }

    if (!isStrongPassword(password.value.trim())) {
      showError(password, "password must be at least 6 characters");
    }

    const users = getUsers();

    const validUser = users.find(
      user => user.email === email.value.trim() && user.password === password.value.trim()
    );

    if (!validUser) {
      showError(email, "Invalid Email");
      showError(password, "Invalid Password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(validUser));

    alert("Login successful!");
    window.location.href = "Dashboard.html";
  });
}
