Chart.defaults.global.legend.display = false;

async function renderHistoricalGraphs() {
    const data = await getHistoricalCountryData(country);
    const {
        indexes,
        deaths,
        cases,
        recovered
    } = parseData(data);

    new Chart(getContext('#death-graph'), setOptions({
        label: 'Mortes',
        borderColor: '#000',
        data: deaths.map(data => data.deaths)
    }));

    new Chart(getContext('#case-graph'), setOptions({
        label: 'Casos',
        borderColor: '#f33',
        data: cases.map(data => data.cases)
    }));

    new Chart(getContext('#recover-graph'), setOptions({
        label: 'Recuperados',
        borderColor: '#33f',
        data: recovered.map(data => data.recovered)
    }));

    new Chart(getContext('#all-graph'), setOptions([{
        label: 'Mortes',
        borderColor: '#000',
        data: deaths.map(data => data.deaths)
    }, {
        label: 'Casos',
        borderColor: '#f33',
        data: cases.map(data => data.cases)
    }, {
        label: 'Recuperados',
        borderColor: '#33f',
        data: recovered.map(data => data.recovered)
    }]));

    function setOptions(dataset) {
        return {
            type: 'line',
            data: {
                labels: indexes,
                datasets: (Array.isArray(dataset) ? dataset : [dataset])
            }
        }
    }
}

async function renderComparativeGraphAndData() {
    const data = await getCountryData(country);
    const keyset = ['tests', 'cases', 'deaths', 'recovered', 'todayCases', 'todayDeaths', 'testsPerOneMillion', 'casesPerOneMillion', 'deathsPerOneMillion'];
    new Chart(getContext('#proportion-graph'), {
        type: 'doughnut',
        data: {
          labels: ['Testes', 'Casos', 'Mortes', 'Recuperados'],
          datasets: [
            {
              label: 'Proporção',
              backgroundColor: ['#3f3' ,'#f33', '#000','#33f'],
              data: [data.tests, data.cases, data.deaths, data.recovered],
              borderWidth: 0
            }
          ]
        },
        options: {
            legend: {
                display: true
            }
        }
    });
    for(const key of keyset) {
        document.getElementById(key).innerText = data[key];
    }
}

function renderGlobalGraph() {
    new Chart(getContext('#global-proportion-graph'));
}