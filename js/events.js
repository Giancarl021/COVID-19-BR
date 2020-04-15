function createInfoEvents() {
    const infoLinks = document.querySelectorAll('.per-million-info');
    for(const infoLink of infoLinks) {
        infoLink.onclick = function () {
            window.location.href = window.location.href.replace(/#.*$/g, '') + '#info';
        }
    }
}