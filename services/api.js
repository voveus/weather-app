const API_KEY = '02fd99f29107456e914006fff00a5b9c'; // Weatherbit API key

//for current weather
const urlCurrent = (city = 'Kiev') =>
  `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`;

//for 3 hourly on 5 days
const urlDays = (city = 'Kiev', days = 5) =>
  `https://api.weatherbit.io/v2.0/forecast/3hourly?city=${city}&days=${days}&key=${API_KEY}`;

//for daily to 7 days
const urlWeek = (city = 'Kiev', days = 7) =>
  `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=${days}&key=${API_KEY}`;

export const getForecast = city => {
  fetch(urlCurrent(city))
    .then(res => res.json())
    .then(data => console.log('parsed json', data))
    .catch(er => console.log('parsing failed', er));
};

export const getDailyForecast = (city, days) => {
  fetch(urlDays(city, days))
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(er => console.log(er));
};

export const getWeeklyForecast = (city, days) => {
  fetch(urlWeek(city, days))
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(er => console.log(er));
};
