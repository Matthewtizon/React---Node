const currentUser = JSON.parse(localStorage.getItem("currrentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}