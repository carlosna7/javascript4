const timeElement = document.querySelector("#time");
const dateElement = document.querySelector("#date");
const infosElement = document.querySelector("#infos");
const timezone = document.querySelector("#time-zone");
// const countryEl = document.querySelector('country');
const weatherForecastEl = document.querySelector('weather-forecast');
const currentTempEl = document.querySelector("#current-temp");

const days = ['Sunday', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Otu', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
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

const getWeatherData = () => {
    navigator.geolocation.getCurrentPosition((success) => {

        // const latitude = success.coords.latitude;
        // const longitude = success.coords.longitude;

        const apiKey = "e2c86b2b53ac4366886745699b0acc8d"
        const apiKey2 = "0bb56b8df4fafa7d92bd58e5a6e6dc79"
        const {latitude, longitude} = success.coords;

        // console.log({latitude, longitude})

        // const link = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&include=minutely`

        // const link = `https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=${apiKey}&units=M`
        
        // const link = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey2}`
        
        fetch(`${link}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // console.log(data.data[0].clouds)

            showWeatherData(data);
        })

    })
}

getWeatherData()

function showWeatherData (data){
    const {rh, pres, clouds, sunrise, sunset, wind_spd, temp, app_temp, city_name} = data.data[0];
    const today = time.getDay();

    timezone.innerHTML = city_name;

    currentTempEl.innerHTML = `
        <div class="infos-items">
            <p>Humidade</p>
            <p>${rh}%</p>
        </div>
        <div class="infos-items">
            <p>presurre</p>
            <p>${pres}</p>
        </div>
        <div class="infos-items">
            <p>Nuvens</p>
            <p>${clouds}</p>
        </div>
        <div class="infos-items">
            <p>Veloc. do vento</p>
            <p>${wind_spd}</p>
        </div>
        <div class="infos-items">
            <p>Nascer do sol</p>
            <p>${window.moment(sunrise).format('HH:mm a')}</p>
        </div>
        <div class="infos-items">
            <p>Por do sol</p>
            <p>${window.moment(sunset).format('HH:mm a')}</p>
        </div>`;

    currentTempEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
        <div>
            <div class="day"><p>Hoje/${days[today]}}</p></div>
            <div class="temp">Temp - ${temp}&#176;C</div>
            <div class="temp">Sens - ${app_temp}&#176;C</div>
        </div>`;


    weatherForecastEl.innerHTML = nextDayForcast;
}