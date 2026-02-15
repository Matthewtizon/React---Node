const user = JSON.parse(localStorage.getItem("currentUser"));

const userNameElement = document.getElementById("userName");
userNameElement.textContent = user.name;

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
})