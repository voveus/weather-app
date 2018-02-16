const API_KEY = 'e9e78010e9a848668b42b57bbc099bca'; // Weatherbit API key
const API_URL = 'https://api.weatherbit.io/v2.0';

export default class WeatherApi {

	constructor(){}

	getCurrentWeather(params) {
		return this.sendRequest(this.buildUrl('current', params));
	}

	get3HourlyForecast(params) {
		return this.sendRequest(this.buildUrl('forecast/3hourly', params));
	}

	getDailyForecast(params) {
		return this.sendRequest(this.buildUrl('forecast/daily', params));
	}

	sendRequest(url) {
		return fetch(url)
			.then(res => res.json());
	}

	buildUrl(method, params) {
		const getParams = Object.entries(params)
			.map(([key, value]) => (`${key}=${value}`))
			.join('&');
		return `${API_URL}/${method}?${getParams}&key=${API_KEY}`;
	}
}
