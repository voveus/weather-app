let currentScale = "metric";
let currentPeriod = "1";

function getForecast () {
    const text = document.getElementById('search');    
    getData(text.value);
}

function getData(query) {
     fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=${currentScale}&cnt=${currentPeriod}&APPID=6d6fe420a0e525a75dacad47d8c7f5d6`)
        .then((response) => {
           return response.json()
        })
        .then((data) => {
            removeChilds();
            displayForecast(data);            
        });   
    } 

function removeChilds () {
    const mainForecast = document.getElementById('mainForecast');
    while (mainForecast.firstChild) {
        mainForecast.removeChild(mainForecast.firstChild);
    }
}

function displayForecast (data) {
    const mainForecast = document.getElementById('mainForecast');

    data.list.forEach((day) => {
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
    weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    summary.appendChild(weatherIcon);

    const avrTemperature = document.createElement('div');
    avrTemperature.innerText = Math.round(data.main.temp) + "°";
    summary.appendChild(avrTemperature);
    avrTemperature.className  = 'avrTemperature';

    const temperature = document.createElement('div');
    temperature.className  = 'temperature';
    summary.appendChild(temperature);  

    const minTemperature = document.createElement('div');
    const minTemperatureHeader = document.createElement('span');1
    const minTemperatureData = document.createElement('span');
    minTemperatureHeader.innerText = "min: ";
    minTemperatureData.innerText = Math.round(data.main["temp_min"]) + "°";
    minTemperature.appendChild(minTemperatureHeader);
    minTemperature.appendChild(minTemperatureData);
    temperature.appendChild(minTemperature);

    const maxTemperature = document.createElement('div');
    const maxTemperatureHeader = document.createElement('span');
    const maxTemperatureData = document.createElement('span');
    maxTemperatureHeader.innerText = "max: ";
    maxTemperatureData.innerText = Math.round(data.main["temp_max"]) + "°";
    maxTemperature.appendChild(maxTemperatureHeader);
    maxTemperature.appendChild(maxTemperatureData);
    temperature.appendChild(maxTemperature);

    const description = document.createElement('h4');
    description.innerText = data.weather[0].description;
    summary.appendChild(description); 
    description.className  = 'description';
    return summary;
}

function generateDetails (data) {
    const details = document.createElement('div');
    details.className  = 'details'; 
    
    const pressure = document.createElement('div');
    pressure.innerText = data.main.pressure + " Pa";
    details.appendChild(pressure);

    const humidity = document.createElement('div');
    humidity.innerText = data.main.humidity + "%";
    details.appendChild(humidity);
    
    const windSpeed = document.createElement('div');
    windSpeed.innerText = data.wind.speed + " m/s";
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
