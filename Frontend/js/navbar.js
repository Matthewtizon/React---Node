const navLinks = document.getElementById("navLinks");
const current = JSON.parse(localStorage.getItem("currentUser"));

if (!navLinks) return;

if (current) {
    navLinks.innerHTML = `
    <a href="Dashboard.html">Dashboard</a>
    `
} else {
    navLinks.innerHTML = `
    <a href="login.html">Login</a>
    <a href="registration.html" class="btn-primary">Register</a>
    `
}
