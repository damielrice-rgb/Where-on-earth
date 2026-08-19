import type { Country } from './types.ts';

export function renderCountryCards(countries: Country[]) {
  const container =
    document.querySelector<HTMLDivElement>("#countries-grid");

  if (!container) return;

  container.innerHTML = "";

  for (const country of countries) {
    const card = document.createElement("article");

    card.className =
      "cursor-pointer overflow-hidden rounded-md bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-light-text";

    const capital = country.capitals?.[0] ?? "N/A";

    card.innerHTML = `
      <img
        src="${country.flags.url_png}"
        alt="Flag of ${country.names.common}"
        class="h-48 w-full object-cover sm:h-52"
      />

      <div class="px-6 py-6">
        <h2 class="mb-4 text-lg font-extrabold">
          ${country.names.common}
        </h2>

        <div class="space-y-1 text-sm">
          <p>
            <strong class="font-semibold">Population:</strong>
            ${country.population.toLocaleString()}
          </p>

          <p>
            <strong class="font-semibold">Region:</strong>
            ${country.region}
          </p>

          <p>
            <strong class="font-semibold">Capital:</strong>
            ${capital}
          </p>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      const detailsContainer =
        document.querySelector<HTMLDivElement>("#country-details");

      if (!detailsContainer) {
        console.error("Country details container not found.");
        return;
      }

      renderCountryDetails(country);

      const grid =
        document.querySelector<HTMLDivElement>("#countries-grid");

      if (grid) {
        grid.style.display = "none";
      }
    });

    container.appendChild(card);
  }
}

export function renderCountryDetails(country: Country) {
  const container =
    document.querySelector<HTMLDivElement>("#country-details");

  if (!container) return;

  const capital = country.capitals?.[0] ?? "N/A";

  const languages =
    country.languages?.map((language) => language.name).join(", ") || "N/A";

  const borders =
    country.borders?.length
      ? country.borders.join(", ")
      : "None";

  container.innerHTML = `
    <div class="py-4 sm:py-8">

      <button
        id="back-button"
        type="button"
        class="mb-16 flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-light-text"
      >
        <span aria-hidden="true">←</span>
        Back
      </button>

      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">

        <div>
          <img
            src="${country.flags.url_png}"
            alt="Flag of ${country.names.common}"
            class="w-full max-w-[560px]"
          />
        </div>

        <div>

          <h2 class="mb-8 text-2xl font-extrabold sm:text-3xl">
            ${country.names.common}
          </h2>

          <div class="grid gap-10 sm:grid-cols-2">

            <div class="space-y-3 text-base">

              <p>
                <strong class="font-semibold">Population:</strong>
                ${country.population.toLocaleString()}
              </p>

              <p>
                <strong class="font-semibold">Region:</strong>
                ${country.region}
              </p>

              <p>
                <strong class="font-semibold">Subregion:</strong>
                ${country.subregion || "N/A"}
              </p>

              <p>
                <strong class="font-semibold">Capital:</strong>
                ${capital}
              </p>

            </div>

            <div class="space-y-3 text-base">

              <p>
                <strong class="font-semibold">Languages:</strong>
                ${languages}
              </p>

            </div>

          </div>

          <div class="mt-12">

            <h3 class="mb-4 font-semibold">
              Border Countries:
            </h3>

            <div class="flex flex-wrap gap-2">
              ${
                country.borders?.length
                  ? country.borders
                      .map(
                        (border) => `
                          <span
                            class="rounded-md bg-white px-5 py-2 text-sm shadow-sm"
                          >
                            ${border}
                          </span>
                        `
                      )
                      .join("")
                  : `<span class="text-sm">None</span>`
              }
            </div>

          </div>

        </div>

      </div>

    </div>
  `;

  const backButton =
    document.querySelector<HTMLButtonElement>("#back-button");

  backButton?.addEventListener("click", () => {
    container.innerHTML = "";

    const countriesGrid =
      document.querySelector<HTMLDivElement>("#countries-grid");

    if (countriesGrid) {
      countriesGrid.style.display = "grid";
    }
  });
}