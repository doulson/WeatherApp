import { Service } from "../types/service";
const apiKey = "0a814b786a9825a4af3989373e5b08eb";
const url = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&`;

export const WeatherService = {
  getWeather(city: string): Promise<Service.Weather> {
    return fetch(`${url}q=${city}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => data as Service.Weather);
  },
  getWeatherByCoords(lat: number, lon: number): Promise<Service.Weather> {
    return fetch(`${url}lat=${lat}&lon=${lon}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => data as Service.Weather);
  },
};