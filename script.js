
document.querySelector('#pesquisar').addEventListener('submit', async (event) => {
    event.preventDefault(); // tira as configuracoes ja colocadas pelo js

    const nomeCidade = document.querySelector('#nome-cidade').value;

    // ! significa diferente
    if (!nomeCidade) {
        return depoisAlerta('Você precisa digitar uma cidade...');
    }

    const chaveAPI = '6c91fc06c585c3fcced98613649a1fa6';
    // coloco encodeURI para poder colocar acentos
    const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomeCidade)}&appid=${chaveAPI}&units=metric&lang=pt_br`

    const resultado = await fetch(urlAPI);
    const json = await resultado.json();

    // console.log(json); se o json for = a 200 esta correto

    if (json.cod === 200) {
        colocarInfos({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMx: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        depoisAlerta('Não foi possível localizar...')
    }
});

function colocarInfos(json) {
    depoisAlerta('');

    document.querySelector('#clima').classList.add('depois');

    document.querySelector('#titulo').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temperatura').innerHTML = `${json.temp.toFixed(0).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#descricao-tempo').innerHTML = `${json.description}`;
    document.querySelector('#img-tempo').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('#temp-max').innerHTML = `${json.tempMx.toFixed(0).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(0).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#humidade').innerHTML = `${json.humidity}%`;
    document.querySelector('#vento').innerHTML = `${json.windSpeed.toFixed(0)}km/h`;
}

function depoisAlerta(msg) {
    document.querySelector('#alerta').innerHTML = msg;
}