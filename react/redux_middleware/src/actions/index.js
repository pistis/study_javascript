import axios from 'axios';
// https://home.openweathermap.org/api_keys
const API_KEY = '3ff7cc946400336a88caed98d775b0ea';
const URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city, country = 'us'){
    const url = `${URL}&q=${city},${country}`;
    const request = axios.get(url);

    console.log('Request', request);
    return {
        type : FETCH_WEATHER,
        payload : request
    }
}