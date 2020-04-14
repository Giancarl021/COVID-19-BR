Chart.defaults.global.legend.display = false;

const baseUrl = 'https://corona.lmao.ninja/v2';
const country = 'brazil';

async function getHistorical(country) {
    return await (await fetch(`${baseUrl}/historical/${country}`)).json();
};

async function getCountryData(country) {
    return await (await fetch(`${baseUrl}/countries/${country}`)).json();
}

function parseData(data) {
    const deaths = [];
    const cases = [];
    const recovered = [];

    for (const period in data.timeline.deaths) {
        deaths.push({
            period: formatPeriod(period),
            deaths: data.timeline.deaths[period]
        })
    }

    for (const period in data.timeline.cases) {
        cases.push({
            period: formatPeriod(period),
            cases: data.timeline.cases[period]
        })
    }

    for (const period in data.timeline.recovered) {
        recovered.push({
            period: formatPeriod(period),
            recovered: data.timeline.recovered[period]
        })
    }

    return {
        deaths,
        cases,
        recovered,
        indexes: deaths.map(e => e.period)
    };

    function formatPeriod(period) {
        const split = period.split('/');
        return `${formatNumber(split[1])}/${formatNumber(split[0])}/20${split[2]}`;

        function formatNumber(n) {
            return n < 10 ? '0' + n : n;
        }
    }
}

async function renderGraphs() {
    const data = await getHistorical(country);
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

async function renderData() {
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

function getContext(selector) {
    return document.querySelector(selector).getContext('2d');
}

async function init() {
    renderData();
    renderGraphs();
}

document.addEventListener('DOMContentLoaded', init);