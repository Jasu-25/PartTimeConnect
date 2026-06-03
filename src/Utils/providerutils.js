
// Close dropdown when clicking outside for better UX [cite: 16]
window.onclick = function (event) {
    if (!event.target.closest('.providerdashboard-user-container')) {
        const dropdowns = document.getElementsByClassName("providerdashboard-dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('active');
        }
    }
}