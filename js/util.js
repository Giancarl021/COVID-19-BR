function getContext(selector) {
    return document.querySelector(selector).getContext('2d');
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

function trackArray(array, check, callback) {
    const arrayChangeHandler = {
        set: function (target, property, value, receiver) {
            target[property] = value;
            check(property, value) && callback(target);
            return true;
        }
    };

    return new Proxy(array, arrayChangeHandler);
}