let currentScale = "M";
let currentPeriod = "1";
const API_URL = "https://api.weatherbit.io/v2.0/forecast/daily"
const API_KEY = "e9e78010e9a848668b42b57bbc099bca"

function getForecast () {
    const text = document.getElementById('search');    
    getData(text.value);
}

async function getData(query) {
    const response = await fetch(`${API_URL}?city=${query}&days=${currentPeriod}&units=${currentScale}&key=${API_KEY}`);
    const data = await response.json();
    console.log(data);  
    displayForecast(data)
    } 


function displayForecast (data) {
    const mainForecast = document.getElementById('mainForecast');

    data.data.forEach((day) => {
        const mainForecastItem = document.createElement('div');
        mainForecast.appendChild(mainForecastItem);
        mainForecastItem.className= 'mainForecastItem'
        
        const summary = generateSummary(day);
        mainForecastItem.appendChild(summary);

        const details = generateDetails(day);
        mainForecastItem.appendChild(details);
    });
}

function generateSummary (data) {
    const summary = document.createElement('div');
    summary.className  = 'summary';

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `../img/icon/${data.weather.icon}.png`;
    summary.appendChild(weatherIcon);

    const avrTemperature = document.createElement('div');
    avrTemperature.innerText = Math.round(data.temp) + "°";
    summary.appendChild(avrTemperature);
    avrTemperature.className  = 'avrTemperature';

    const temperature = document.createElement('div');
    temperature.className  = 'temperature';
    summary.appendChild(temperature);  

    const minTemperature = document.createElement('div');
    const minTemperatureHeader = document.createElement('span');1
    const minTemperatureData = document.createElement('span');
    minTemperatureHeader.innerText = "min: ";
    minTemperatureData.innerText = Math.round(data.min_temp) + "°";
    minTemperature.appendChild(minTemperatureHeader);
    minTemperature.appendChild(minTemperatureData);
    temperature.appendChild(minTemperature);

    const maxTemperature = document.createElement('div');
    const maxTemperatureHeader = document.createElement('span');
    const maxTemperatureData = document.createElement('span');
    maxTemperatureHeader.innerText = "max: ";
    maxTemperatureData.innerText = Math.round(data.max_temp) + "°";
    maxTemperature.appendChild(maxTemperatureHeader);
    maxTemperature.appendChild(maxTemperatureData);
    temperature.appendChild(maxTemperature);

    const description = document.createElement('h4');
    description.innerText = data.weather.description;
    summary.appendChild(description); 
    description.className  = 'description';
    return summary;
}

function generateDetails (data) {
    const details = document.createElement('div');
    details.className  = 'details'; 
    
    const pressure = document.createElement('div');
    pressure.innerText = data.pres + " Pa";
    details.appendChild(pressure);

    const humidity = document.createElement('div');
    humidity.innerText = data.pop + "%";
    details.appendChild(humidity);
    
    const windSpeed = document.createElement('div');
    windSpeed.innerText = data.wind_spd + " m/s";
    details.appendChild(windSpeed);  

    return details;
}

function onKeyPress (event) {  
    if (event.which == 13 || event.keyCode == 13) {
        getForecast();
        return false;
    }
    return true;
}

function toggleScale (scale) {
    currentScale = scale;
    getForecast();
}

function togglePeriod () {
    currentPeriod = document.querySelector(".forecastPeriod").value;
    getForecast();
}
