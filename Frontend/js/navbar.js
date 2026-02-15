
const navLinks = document.getElementById("navLinks");
const current = JSON.parse(localStorage.getItem("currentUser"));




if (current) {
    
    navLinks.innerHTML = `
    <button type="reset" id="logoutBtn" >Logout</button>
    `
} else {
    navLinks.innerHTML = `
    <a href="login.html">Login</a>
    <a href="registration.html" class="btn-primary">Register</a>
    `
}


const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
})