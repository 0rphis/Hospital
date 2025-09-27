// script.js
function toggleSidebar(open) {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("openBtn");
    const overlay = document.getElementById("overlay");

    if (open) {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        openBtn.style.display = "none"; // Esconde botão 🔍
    } else {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        openBtn.style.display = "block"; // Mostra botão 🔍
    }
}
