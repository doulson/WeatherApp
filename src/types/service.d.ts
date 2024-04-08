import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
export interface IconProps {
  icon: IconDefinition;
  size?: string;
  color?: string;
}

declare namespace Service {
  //WeatherService
  interface Weather {
    coord: {
      lon: number;
      lat: number;
    };
    weather?: WeatherObj[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    rain: {
      "1h": number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
    createdAt: Date;
  }

  interface WeatherObj {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  //CountryService
  type Country = {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
      lon: number;
      lat: number;
    };
  };
}
