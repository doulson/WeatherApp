import { Service } from "../types/service";

export const CountryService = {
  getCountries() {
    return fetch("/data/countries.json", {
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((d) => d as Service.Country[]);
  },
};
