const timeElement = document.querySelector("#time");
const dateElement = document.querySelector("#date");
const infosElement = document.querySelector("#infos-items");
const timezone = document.querySelector("#time-zone");
const weatherForecastEl = document.querySelector("#weather-forecast");
const currentTempEl = document.querySelector("#current-temp");

const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
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

        // const latitude = success.coords.latitude;
        // const longitude = success.coords.longitude;

        const apiKey = "e2c86b2b53ac4366886745699b0acc8d"
        const apiKey2 = "0bb56b8df4fafa7d92bd58e5a6e6dc79"
        const {latitude, longitude} = success.coords;

        // console.log({latitude, longitude})

        // const link = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&include=minutely`;
       
        const linkForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=M`
        
        // const link = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey2}`

        // fetch(link)
        // .then(res => res.json())
        // .then(data => {

        //     console.log(data)

        //     showWeatherData(data);

        // })

        fetch(linkForecast)
        .then(res => res.json())
        .then(data => {

            console.log(data)

            showWeatherForecast(data);

        })

    })
}

// function showWeatherData(data) {
//     const {rh, pop, clouds, sunrise, sunset, wind_spd, temp} = data.data[0];
//     const {city_name} = data
//     const {icon} = data.data[0].weather
//     const today = time.getDay();

//     timezone.innerText = city_name;

//     infosElement.innerHTML = `
//         <div class="infos-items">
//             <p>Humidade</p>
//             <p>${rh}%</p>
//         </div>
//         <div class="infos-items">
//             <p>Chuva</p>
//             <p>${pop}$</p>
//         </div>
//         <div class="infos-items">
//             <p>Nuvens</p>
//             <p>${clouds}%</p>
//         </div>
//         <div class="infos-items">
//             <p>Veloc. do vento</p>
//             <p>${wind_spd}</p>
//         </div>
//         <div class="infos-items">
//             <p>Nascer do sol</p>
//             <p>${sunrise}</p>
//         </div>
//         <div class="infos-items">
//             <p>Por do sol</p>
//             <p>${sunset}</p>
//         </div>`;

//     currentTempEl.innerHTML = `
//         <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="weather icon" class="w-icon">
//         <div>
//             <div class="day"><p>Hoje/${days[today]}</p></div>
//             <div class="temp">Temp / ${temp}&#176;C</div>
//             <div class="temp2">Max / ${app_max_temp}&#176;C</div>
//             <div class="temp2">Min / ${app_min_temp}&#176;C</div>
//         </div>`;
// }

function showWeatherForecast(data) {

    const forecastData = data.data;

    if (forecastData.length !== 0) {

        let forecastHTML = ""

        forecastData.slice(1, 7).forEach((forecast) => {
            const { app_max_temp, app_min_temp } = forecast;
    
            forecastHTML += `
            <div class="weather-forecast-item">
                <div class="day">Sáb</div>
                <img src="https://www.weatherbit.io/static/img/icons/c01d.png" alt="weather icon" class="w-icon">
                <div class="temp">Max / ${app_max_temp}&#176;C</div>
                <div class="temp">Min / ${app_min_temp}&#176;C</div>
            </div>
            `;
        });

        weatherForecastEl.innerHTML = forecastHTML
    } 
}
