import './styles.css';
import { getCountries } from './api.ts';
import { renderCountryCards, renderCountryDetails } from './render.ts';

let countries = getCountries();
console.log("Number of countries:", countries.length);

console.log(
  "Countries containing United:",
  countries.filter(country =>
    country.names.common.toLowerCase().includes("united")
  )
);

let searchTerm = "";
let selectedRegion = "";
// make both filters work together
function filterCountries() {
  console.log("search term:", searchTerm);
  console.log("selected:", selectedRegion);
  
  const filteredCountries = countries.filter((country) => {
      const matchesSearch = country.names.common.toLowerCase().includes(searchTerm);

      const matchesRegion = selectedRegion === "" || country.region === selectedRegion;

      console.log(
        country.names.common,
        "search:",
        matchesSearch,
        "region:",
        matchesRegion
      );
      

      return matchesSearch && matchesRegion;
  });
  console.log("Filtered:", filteredCountries);
  
  renderCountryCards(filteredCountries);

  
}
//console.log(countries[0]);
//console.log(countries[0].names);

renderCountryCards(countries);

// Connect input to typscript 
const searchInput = document.querySelector<HTMLInputElement>("#search-input");
// Add event listener to input
searchInput?.addEventListener('input', () => {
  // get what user types and save in varibale/lowerCase
  searchTerm = searchInput.value.toLowerCase();
  filterCountries();
  
  //filter throught countries array
  //const filteredCountries = countries.filter((country) => {
   // return country.names.common.toLowerCase().includes//(searchTerm);
  //})
  //console.log("Matches:", filteredCountries);
  
   // clears existing cards and creates only those two
    //renderCountryCards(filteredCountries());
});

// connect dropdown to typescript
const regionFilter = document.querySelector<HTMLSelectElement>("#region-filter");

regionFilter?.addEventListener("change", () => {
  selectedRegion = regionFilter.value;

  filterCountries();

 /* const filteredCountries = countries.filter((country) => {
    return selectedRegion === "" || country.region === selectedRegion;
  })
  renderCountryCards(filteredCountries)
  */
});

const themeToggle = document.querySelector<HTMLButtonElement>("#theme-toggle");

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});