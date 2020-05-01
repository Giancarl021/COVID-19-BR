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
    let response, json;
    try {
        response = await fetch(url);
        json = await response.json();
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: '<b>Ooops...</b>',
            text: 'Houve algum erro na requisição de dados'
        });
    }
}