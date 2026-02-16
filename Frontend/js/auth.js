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

function toggleLoading(button, isLoading) {
  const spinner = button.querySelector(".spinner");
  const text = button.querySelector(".btn-text");

  if (isLoading) {
    spinner.style.display = "inline-block";
    text.style.opacity = "0.5";
    button.disabled = true;
  } else {
    spinner.style.display = "none";
    text.style.opacity = "1";
    button.disabled = false;
  }
}

function fetchWithTimeout(promise, timeout = 5000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout)
    )
  ]);
}

// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const registerBtn = document.getElementById("registerBtn");
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
    
    try {
      toggleLoading(registerBtn, true);

      const users = getUsers();

      const existingUser = users.find(user => user.email === email.value.trim())
          
        
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
    } finally {
      toggleLoading(registerBtn, false);
    }
  });
}

const loginForm = document.getElementById("loginform");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const loginBtn = document.getElementById("loginBtn")
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

    try {
      toggleLoading(loginBtn, true);

      await new Promise(resolve => setTimeout(resolve, 1000));

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

      window.location.href = "Dashboard.html";
  
    } finally { 
      toggleLoading(loginBtn, false);
    }
      });
}
