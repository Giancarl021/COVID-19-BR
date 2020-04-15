async function init() {
    renderHistoricalGraphs();
    renderComparativeGraphAndData();
    renderGlobalGraph();

    createInfoEvents();
}

document.addEventListener('DOMContentLoaded', init);