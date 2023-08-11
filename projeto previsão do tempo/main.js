const timeElement = document.querySelector("#time");
const dateElement = document.querySelector("#date");
const infosElement = document.querySelector("#infos");
const timezone = document.querySelector("#time-zone");
// const countryEl = document.querySelector('country');
// const weatherForecastEl = document.querySelector('weather-forecast');
const currentTempEl = document.querySelector("#current-temp");

const days = ['Sunday', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Otu', 'Nov', 'Dec'];

const apiKey = "0bb56b8df4fafa7d92bd58e5a6e6dc79"

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

        const {latitude, longitude} = success.coords;

        // console.log({latitude, longitude})

        const link = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=`
        
        fetch(`${link}${apiKey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showWeatherData(data);
        })

    })
}

getWeatherData()