import type { Country } from './types.ts';
import localCountries from '../data.json';
console.log("Local JSON:", localCountries);

// import data from ''

//const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY
const API_URL = 'https://restcountries.com/v3.1'

function normalize(raw: any): Country {
  return {
    names: {
      common: raw.name?.common ?? raw.name ?? "",
    },

    capitals: Array.isArray(raw.capital) 
    ? raw.capital 
    : raw.capital
      ? [raw.capital]
      : [],

      region: raw.region ?? "",
    subregion: raw.subregion ?? "",
    population: raw.population ?? 0,
    flags: {
      url_svg: raw.flags?.svg ?? raw.flag ?? "",
      url_png: raw.flags?.png ?? raw.flag ?? "",
    },
    alpha3code: raw.cca3 ?? raw.alpha3Code ?? "",

    languages: Array.isArray(raw.languages)
    ? raw.languages
    : raw.languages
      ? Object.values(raw.languages).map((language: any) => ({
        name: language
        }))
        : [],
    borders: raw.borders ?? [],
  };
}

export const localCountryData: Country[] = (localCountries as any[]).map(normalize);

let apiCountries: Country[] | null = null;




  export function getCountries(): Country[] {
    return localCountryData;
  }

  export async function getCountriesFromAPI(): Promise<Country[]> {

  if (apiCountries) {
    return apiCountries;
  }

  try {
    const response = await fetch(
      `${API_URL}/all`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();

    //const countries = result.data.objects;

    apiCountries = result.map(normalize);

    return apiCountries;

  } catch (error) {
    console.error("API request failed:", error);
    console.error("Falling back to local JSON...");

    return localCountryData;
  }
}

  