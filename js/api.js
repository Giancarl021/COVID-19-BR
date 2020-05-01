const baseUrl = 'https://corona.lmao.ninja/v2';
const country = 'brazil';

async function getHistoricalCountryData(country) {
    return get(`${baseUrl}/historical/${country}/`);
};

async function getCountryData(country) {
    return await get(`${baseUrl}/countries/${country}/`);
}

async function getGlobalData() {
    return await get(`${baseUrl}/all/`);
}

async function get(url) {
    return await (await fetch(url)).json();
}