const activeUser = JSON.parse(localStorage.getItem("currentUser"));

if (activeUser) {
    window.location.href = "Dashboard.html";
}