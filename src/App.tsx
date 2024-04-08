import { useEffect, useState, FormEvent } from "react";
//3rd party libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ScrollParallax } from "react-just-parallax";
//services & types
import { WeatherService } from "./services/Weather";
import { CountryService } from "./services/Country";
import type { Service } from "./types/service";
//components
import WeatherCard from "./components/WeatherCard";
import ThemeButton from "./components/ThemeButton";
import SearchHistoryCard from "./components/SearchHistoryCard";
import AutoCompleteInput from "./components/AutoCompleteInput";

function App() {
  const [weather, setWeather] = useState<Service.Weather | null>(null);
  const [country, setCountry] = useState<Service.Country[]>([]);
  const [weatherHistory, setWeatherHistory] = useState<Service.Weather[]>(
    () => {
      const storedHistory = sessionStorage.getItem("weatherHistory"); // store the history in sessionStorage
      return storedHistory ? JSON.parse(storedHistory) : [];
    }
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    Promise.all([CountryService.getCountries(), getGeolocation()]).then(
      (data) => {
        setCountry(data[0]);
        setWeather(data[1]);
        setLoading(false);
      }
    );
  }, []);

  //Get geo location from device
  const getGeolocation = (): Promise<Service.Weather | null> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const weatherData = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            resolve(weatherData);
          },
          (error) => {
            console.error(
              "Geolocation is not supported by this browser.",
              error
            );
            resolve(null);
          }
        );
      } else {
        // Geolocation is not supported
        console.error("Geolocation is not supported by this browser.");
        resolve(null);
      }
    });
  };
  // Function to fetch weather by geographic coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    return await WeatherService.getWeatherByCoords(lat, lon)
      .then((data: Service.Weather) => {
        if (data.cod === 200) {
          return data;
        }
        return null;
      })
      .catch((error) => {
        console.error("Failed to fetch weather by coordinates", error);
        return null;
      });
  };
  // Function to fetch weather by city name
  const fetchWeatherByName = (city: string) => {
    if (city == weather?.name) return null;
    setLoading(true);
    WeatherService.getWeather(city).then((data: Service.Weather) => {
      if (data.cod == 200) {
        const result = { ...data, createdAt: new Date() };
        setWeather(result);
        const updatedWeatherHistory = [result, ...weatherHistory];
        setWeatherHistory(updatedWeatherHistory);
        sessionStorage.setItem(
          "weatherHistory",
          JSON.stringify(updatedWeatherHistory)
        );
      } else {
        setWeather(null);
      }
      setLoading(false);
    });
  };

  const deleteWeatherHistory = (index: number) => {
    const newHistory = [...weatherHistory];
    newHistory.splice(index, 1);
    setWeatherHistory(newHistory);
    sessionStorage.setItem("weatherHistory", JSON.stringify(newHistory));
  };

  //When search is submitted
  const handleSearch = (e?: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (city) {
      fetchWeatherByName(city);
      setCity("");
    }
  };

  return (
    <>
      <div className="py-3 w-full max-w-screen-md mx-auto px-5 mt-10 pt-10">
        <ScrollParallax>
          <div className="text-right py-3">
            <ThemeButton />
          </div>
          <form className="flex justify-center w-full" onSubmit={handleSearch}>
            <div className="mr-2 w-full">
              <AutoCompleteInput
                className="w-90"
                resources={country}
                label="Country"
                onChange={setCity}
                value={city}
              />
            </div>
            <button
              type="submit"
              className="btn btn-ghost border-0 rounded-[15px] bg-lightpurple hover:bg-purple-900 dark:bg-purple-950 dark:hover:bg-purple-700 text-white transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          <div className="card card-body gap-4 rounded-[2rem] shadow-lg bg-white/25 border dark:bg-black/25 border-white dark:border-black/25 mt-40 sm:mt-28">
            <WeatherCard data={weather} loading={loading} />
            <SearchHistoryCard
              data={weatherHistory}
              onSearch={fetchWeatherByName}
              onDelete={deleteWeatherHistory}
            />
          </div>
        </ScrollParallax>
      </div>
    </>
  );
}

export default App;
