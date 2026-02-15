const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

if (loggedInUser) {
    window.location.href = "Dashboard.html";
}

