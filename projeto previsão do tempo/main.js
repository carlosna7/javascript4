const timeElement = document.querySelector("#time");
const dateElement = document.querySelector("#date");
const infosElement = document.querySelector("#infos-items");
const timezone = document.querySelector("#time-zone");
const weatherForecastEl = document.querySelector("#weather-forecast");
const currentTempEl = document.querySelector("#current-temp");
const country = document.querySelector(".country")

const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Otu', 'Nov', 'Dec'];
const time = new Date();

getWeatherData()

setInterval(() => {
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    if(hour < 10 && minutes < 10) {
        timeElement.innerHTML = `<p>0${hour}:0${minutes}</p><span id="am-pm">${ampm}</span>`
    } else if(hour < 10 && minutes >= 10) {
        timeElement.innerHTML = `<p>0${hour}:${minutes}</p><span id="am-pm">${ampm}</span>`
    }

    if(hour >= 10 && minutes < 10) {
        timeElement.innerHTML = `<p>${hour}:0${minutes}</p><span id="am-pm">${ampm}</span>`
    } else if(hour >= 10 && minutes >= 10) {
        timeElement.innerHTML = `<p>${hour}:${minutes}</p><span id="am-pm">${ampm}</span>`
    }

    dateElement.innerHTML =  `<p>${days[day]}, ${date} ${months[month]}</p>` 

}, 1000);

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        const apiKey = "e2c86b2b53ac4366886745699b0acc8d"

        // const latitude = success.coords.latitude;
        // const longitude = success.coords.longitude;
        const {latitude, longitude} = success.coords;
        // console.log({latitude, longitude})


        // criar contador para saber quantas vezes a p[agina/ sessão foi iniciada. Acrescentar 1 unidade sempre que for pesquisado algo. Quando ninguem tiver feito pesquisa de cidade, ou seja, contador === 0 usar os links de latitude a longitude, quando o contador for > 0 usar outro padrão de links, os links que vão receber o nome da cidade digitada 

        const link = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&include=minutely`;
       
        const linkForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=M`
        

        fetch(link)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showWeatherData(data);
        })

        fetch(linkForecast)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showWeatherForecast(data);
        })
    })
}

function showWeatherData(data) {
    const {rh, precip, clouds, sunrise, sunset, wind_spd, temp, timezone, city_name, country_code} = data.data[0];
    const {icon} = data.data[0].weather
    const today = time.getDay();

    timezone.innerText = timezone;
    country.innerHTML = `
        <p>${city_name}</p>
        <img src="https://flagsapi.com/${country_code}/flat/64.png">
    `

    infosElement.innerHTML = `
        <div class="infos-items">
            <p>Humidade</p>
            <p>${rh}%</p>
        </div>
        <div class="infos-items">
            <p>Chuva</p>
            <p>${precip}%</p>
        </div>
        <div class="infos-items">
            <p>Nuvens</p>
            <p>${clouds}%</p>
        </div>
        <div class="infos-items">
            <p>Veloc. do vento</p>
            <p>${wind_spd}</p>
        </div>
        <div class="infos-items">
            <p>Nascer do sol</p>
            <p>${sunrise}</p>
        </div>
        <div class="infos-items">
            <p>Por do sol</p>
            <p>${sunset}</p>
        </div>`;

    currentTempEl.innerHTML = `
        <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="weather icon" class="w-icon">
        <div class="selectMaxMin">
            <div class="day"><p>${days[today]}</p></div>
            <div class="temp">Temp / ${temp}&#176;C</div>
            <div class="temp2 selectMax"></div>
            <div class="temp2 selectMin"></div>
        </div>`;
}

function showWeatherForecast(data) {

    const forecastData = data.data;
    const today = time.getDay();
    const maxIndex0 = document.querySelector(".selectMax")
    const minIndex0 = document.querySelector(".selectMin")
    
    if(forecastData === 0) {
        const {app_max_temp, app_min_temp} = data.data[0]

        maxIndex0.innerText += `Min / ${app_max_temp}° C`
        minIndex0.innerText += `Min / ${app_min_temp}° C`
    }

    if (forecastData.length !== 0) {

        let forecastHTML = ""

        forecastData.slice(1, 7).forEach((forecast) => {
            const {app_max_temp, app_min_temp} = forecast;
    
            forecastHTML += `
            <div class="weather-forecast-item">
                <div class="day">${days[today]}</div>
                <img src="https://www.weatherbit.io/static/img/icons/c01d.png" alt="weather icon" class="w-icon">
                <div class="temp">Max / ${app_max_temp}&#176;C</div>
                <div class="temp">Min / ${app_min_temp}&#176;C</div>
            </div>
            `;
        });

        weatherForecastEl.innerHTML = forecastHTML
    } 
}
