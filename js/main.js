async function init() {
        renderHistoricalGraphs().catch(thr);
        renderComparativeGraphAndData().catch(thr);
        renderGlobalGraph().catch(thr);

        createInfoEvents();
}

document.addEventListener('DOMContentLoaded', init);