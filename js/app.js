let params = {
        units: "M",
        days: "16",
        city: ""
    }

function init() {
    const text = document.getElementById('search');
    params.city = text.value.toLowerCase();
    const forecastPeriod = document.querySelector(".forecastPeriod").value;
    const scale = document.querySelector('input[name="toggleScale"]:checked').value;
    makeForecast(forecastPeriod, scale);
}

async function makeForecast(forecastPeriod, scale) {
    if (storageAvailable('localStorage')) {
        var storageData = extractFromStorage(params.city);
        storageData = JSON.parse(storageData);

        if ((storageData !== null) && checkDataExpire(storageData)) {
            localStorage.clear();
            storageData == null;
        }
        if (storageData === null) {
            await getForecast()
                .then(jsonData => JSON.stringify(jsonData))
                .then(data => populateStorage(params.city, data));
            storageData = extractFromStorage(params.city);
            storageData = JSON.parse(storageData);
        }
        
        displayForecast(storageData, forecastPeriod, scale);

    } else {
        getForecast().then(data => displayForecast(data, forecastPeriod, scale));
    }
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            storage.length !== 0;
    }
}

function getForecast() {
    let cityWeather = new WeatherApi();
    return cityWeather.getDailyForecast(params)
        .then(data => data);
}

function populateStorage(key, value) {
    localStorage.setItem(key, value);
}

function extractFromStorage(key) {
    return localStorage.getItem(key);
}

function checkDataExpire(storageData) {
    let storageTimeStamp = (storageData.data[0].ts + "000") * 1;
    let storageDate = new Date(storageTimeStamp);
    let storageHour = storageDate.getHours();
    let storageExpires = storageTimeStamp + ((24 - storageHour) * 60 * 60 * 1000);
    let currentTimeStamp = Date.now();

    if (currentTimeStamp > storageExpires) {
        return true;
    } else {
        return false;
    }
}


function removeChilds () {
    const mainForecast = document.getElementById('mainForecast');
    while (mainForecast.firstChild) {
        mainForecast.removeChild(mainForecast.firstChild);
    }
}

function displayForecast (cityData, forecastPeriod, scale) {
    removeChilds();

    const mainForecast = document.getElementById('mainForecast');

    cityData.data.every((day, index) => {
        if (index >= forecastPeriod) {return false}
            else {
        const mainForecastItem = document.createElement('div');
        mainForecast.appendChild(mainForecastItem);
        mainForecastItem.className= 'mainForecastItem'
        
        const summary = generateSummary(day, scale);
        mainForecastItem.appendChild(summary);

        const details = generateDetails(day);
        mainForecastItem.appendChild(details);

        return true;

    }
    });
}

function generateSummary (data, scale) {
    const summary = document.createElement('div');
    summary.className  = 'summary';

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `img/icons/${data.weather.icon}.png`;
    summary.appendChild(weatherIcon);

    const avrTemperature = document.createElement('div');
    avrTemperature.innerText = ((scale == "M") ? Math.round(data.temp) : Math.round(toFahrenheit(data.temp))) + "°";
    summary.appendChild(avrTemperature);
    avrTemperature.className  = 'avrTemperature';

    const temperature = document.createElement('div');
    temperature.className  = 'temperature';
    summary.appendChild(temperature);  

    const minTemperature = document.createElement('div');
    const minTemperatureHeader = document.createElement('span');1
    const minTemperatureData = document.createElement('span');
    minTemperatureHeader.innerText = "min: ";
    minTemperatureData.innerText = ((scale == "M") ? Math.round(data.min_temp) : Math.round(toFahrenheit(data.min_temp))) + "°";
    minTemperature.appendChild(minTemperatureHeader);
    minTemperature.appendChild(minTemperatureData);
    temperature.appendChild(minTemperature);

    const maxTemperature = document.createElement('div');
    const maxTemperatureHeader = document.createElement('span');
    const maxTemperatureData = document.createElement('span');
    maxTemperatureHeader.innerText = "max: ";
    maxTemperatureData.innerText = ((scale == "M") ? Math.round(data.max_temp) : Math.round(toFahrenheit(data.max_temp))) + "°";
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

function toFahrenheit(temperature) {
    return temperature * 1.8 + 32;
}

function onKeyPress (event) {  
    if (event.which == 13 || event.keyCode == 13) {
        init();
        return false;
    }
    return true;
}

function toggleScale() {
    init();
}

function togglePeriod() {
    init();
}
