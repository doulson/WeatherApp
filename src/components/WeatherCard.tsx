// components/WeatherCard.tsx
import React from "react";
import { MouseParallax } from "react-just-parallax";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Service } from "../types/service";
import { formatDate } from "../utils/format";
import cloudImg from "/images/icon/cloud.png";
import sunImg from "/images/icon/sun.png";

interface WeatherCardProps {
  data?: Service.Weather | null; // The weather data is optional
  loading: boolean; //
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="text-center h-40">
        <span className="loading loading-ball loading-lg text-gray-500 h-full"></span>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="text-center font-medium text-lg">
        <FontAwesomeIcon icon={faQuestion} className="text-9xl" />
        <p className="my-5">
          No weather data available. Please search for a city.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <MouseParallax strength={0.03}>
        <div className="absolute top-15 sm:top-[10%] right-[17%] transform translate-x-1/2 -translate-y-1/2 w-[55%] sm:w-2/5">
          <img
            src={
              data.weather?.length && data.weather[0].id > 799
                ? sunImg
                : cloudImg
            }
            alt=""
          />
        </div>
      </MouseParallax>
      <p className="text-md font-semibold dark:text-white">Today's Weather</p>
      <div className="flex justify-between">
        <span className="text-8xl font-bold text-darkpurple dark:text-white">
          {data.main.temp.toFixed(0)}°
        </span>
        <div className="block sm:hidden self-end text-gray-500 dark:text-white">
          <span>{data.weather?.length ? data.weather[0].main : "N/A"}</span>
        </div>
      </div>

      <div className="flex justify-between  dark:text-white">
        <div className="flex">
          <div className="mr-1">H: {data.main.temp_max.toFixed(0)}°</div>
          <div>L: {data.main.temp_min.toFixed(0)}°</div>
        </div>

        <div className="block sm:hidden text-gray-500 dark:text-white">
          <span>Humidity: {data.main.humidity}%</span>
        </div>
      </div>
      <div className="flex justify-between text-gray-500 dark:text-white text-md ">
        <span className="font-bold">
          {data.name}, {data.sys.country}
        </span>
        <span>{formatDate(data.createdAt)}</span>
        <span className="hidden sm:block">Humidity: {data.main.humidity}%</span>
        <span className="hidden sm:block">
          {data.weather?.length ? data.weather[0].main : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
