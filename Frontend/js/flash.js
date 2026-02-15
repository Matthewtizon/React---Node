function setFlashMessage(message) {
    sessionStorage.setItem("flashMessage", message);
}

function showFlashMessage() {
    const message = sessionStorage.getItem("flashMessage");

    if (!message) return;

    const flash = document.createElement("div");
    flash.className = "flash-message";
    flash.textContent = message;

    document.body.prepend(flash);

    sessionStorage.removeItem("flashMessage");

    setTimeout(() => {
        flash.remove();
    }, 3000);
}