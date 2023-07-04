// import { City } from "./City.js";
// import { Weather } from "./Weather.js";

const directGeocodingApiRoot =
   "https://api.openweathermap.org/geo/1.0/direct?q=";
const reverseDirectGeocodingApiRoot =
   "https://api.openweathermap.org/geo/1.0/reverse?";
const oneCallApiRoot = "https://api.openweathermap.org/data/2.5/weather?";
const directGeocodingApiKey = "db01a2cdeec12abd2aaf6de10f970d06";
const oneCallApiKey = "c9eccf23c97be99196bb439d594c31e8";
const citySearch = document.querySelector("#city-input");
const citySubmit = document.querySelector("form");
const weatherSearchIcon = document.querySelectorAll(".by-weather-search");
const submitButton = document.querySelector("#my-button");

citySearch.value = "dijon";

citySubmit.addEventListener("submit", (event) => {
   event.preventDefault();
   SearchedCity = new City(citySearch.value);
   console.log(SearchedCity);

   const cardContainers = document.querySelectorAll(".card-containers");
   if (cardContainers) {
   }
   cardContainers.forEach((element) => {
      element.remove();
   });

   const byCityQuery =
      directGeocodingApiRoot +
      citySearch.value +
      "&limit=0&appid=" +
      directGeocodingApiKey;

   /**
    *
    *  FETCH
    *    CITYBYQUERY
    *
    *    recherche la latitude et la longitude d'une ville
    *    pour :
    *       rechercher la meteo de la ville
    */
   fetch(byCityQuery)
      .then((response) => {
         return response.json();
      })
      .then((datas) => {
         console.log(datas);
         datas.forEach((element, i) => {
            const byGeoCoordinatesQuery = `${oneCallApiRoot}lat=${element.lat}&lon=${element.lon}&units=metric&appid=${directGeocodingApiKey}`;
            fetch(byGeoCoordinatesQuery)
               .then((secondResponse) => {
                  return secondResponse.json();
               })
               .then((donnees) => {
                  const cityTemp = Math.round(donnees.main.temp);
                  console.log(cityTemp);
                  console.log(donnees);
                  createFullElement("div", "#main-cards-container", {
                     className: "flex-column card-containers",
                     id: `card-containers${i}`,
                  });
                  createFullElement("div", `#card-containers${i}`, {
                     className: "flex-row search-temp-weather",
                     id: `temp-weather${i}`,
                  });
                  createFullElement("div", `#temp-weather${i}`, {
                     className: "flex-column",
                     textContent: `${cityTemp}°C`,
                  });
                  createFullElement("div", `#temp-weather${i}`, {
                     className: "flex-column",
                     id: `weather-icon-${i}`,
                  });
                  createFullElement("img", `#weather-icon-${i}`, {
                     className: "flex-column",
                     width: 30,
                     height: 30,
                     src: `./assets/Icones/standard/${donnees.weather[0].icon}.svg`,
                  });
                  createFullElement("div", `#card-containers${i}`, {
                     className: "flex-row standard-texts results-city-title",
                     textContent: element.name,
                  });
                  createFullElement("div", `#card-containers${i}`, {
                     className: "flex-row standard-texts search-country-title",
                     textContent: `${element.state} (${element.country})`,
                  });
               });
         });
      });
});

weatherSearchIcon.forEach((element) => {
   element.addEventListener("click", (event) => {
      event.preventDefault();
   });
});
submitButton.addEventListener("click", async (event) => {
   console.log("clic");
   let randomSuccess = false;
   let searchedWeather = false;
   do {
      const randomLat = Math.round(Math.random() * 180) - 90;
      const randomLon = Math.round(Math.random() * 360) - 180;
      event.preventDefault();
      // const theContent = document.body.innerHTML();
      // document.body.remove(theContent);
      console.log(randomLat);
      console.log(randomLon);
      const reverseQuery =
         reverseDirectGeocodingApiRoot +
         "lat=" +
         randomLat +
         "&lon=" +
         randomLon +
         "&limit=0&appid=" +
         directGeocodingApiKey;
      await fetch(reverseQuery)
         .then((response) => {
            return response.json();
         })
         .then((donnees) => {
            if (donnees.length < 1) return;

            randomSuccess = true;
            // createCitiesContainers();

            let i = 0;
            for (let donnee of donnees) {
               i++;
               const byGeoCoordinatesQuery = `${oneCallApiRoot}lat=${randomLat}&lon=${randomLon}&units=metric&appid=${directGeocodingApiKey}`;
               fetch(byGeoCoordinatesQuery)
                  .then((secondResponse) => {
                     return secondResponse.json();
                  })
                  .then((datas) => {
                     console.log(datas);
                     console.log(datas.weather[0].icon);
                     datas.weather[0].icon === "10n"
                        ? (searchedWeather = true)
                        : (searchedWeather = false);

                     console.log(searchedWeather);
                     //  createFullElement("div", "#cities-container", {
                     //     id: `city-container-${datas.id}`,
                     //     className: `city-container`,
                     //  });
                     //  createFullElement("li", `#city-container-${datas.id}`, {
                     //     textContent: `${donnee.name} - ${donnee.state} (${donnee.country})`,
                     //     id: "location-" + datas.id,
                     //  });
                     //  createFullElement("p", "#location-" + datas.id, {
                     //     textContent: ` lat:${donnee.lat} lon:${donnee.lon}`,
                     //     className: "lat-lon",
                     //  });
                     //  createFullElement("p", "#location-" + datas.id, {
                     //     textContent: `${datas.weather[0].description}`,
                     //  });
                     //  createFullElement("p", "#location-" + datas.id, {
                     //     textContent: `Températures`,
                     //     className: `inter-title`,
                     //  });
                     //  createFullElement("p", "#location-" + datas.id, {
                     //     textContent: `Min: ${datas.main.temp_min} - Max: ${datas.main.temp_max} - Ressenti: ${datas.main.feels_like}`,
                     //  }); //

                     const wikiSearchWords = `${donnee.name}`;
                     const cityInputFormated = wikiSearchWords.replaceAll(
                        " ",
                        "_"
                     );
                     //  const wikipediaQuery = `${wikipediaApiRoot}${cityInputFormated}&format=json&origin=* `;

                     //  fetch(wikipediaQuery)
                     //     .then((wikiAnswer) => {
                     //        return wikiAnswer.json();
                     //     })
                     /**
                      *
                      * we get wikiDatas
                      *
                      *
                      *
                      */
                     // .then((wikiDatas) => {
                     //    if (wikiDatas.hasOwnProperty("error")) return;
                     //    let wikiContent = getwikiContent(wikiDatas); //returns wikiContent

                     //    /**
                     //     * We create a ghost container
                     //     *    to get elements with query selectors
                     //     *       from wiki parsed content
                     //     */
                     //    let wikiHtmlContent =
                     //       serveWikiHtmlContent(wikiContent);

                     //    // // we temporary append wiki html content to inspect it
                     //    // createFullElement("div", "#main-container", {
                     //    //   innerHTML: wikiContent,
                     //    //   id: "wiki-content",
                     //    // });

                     //    /**
                     //     *
                     //     * Now we get short description
                     //     *    from ghost container
                     //     *
                     //     */

                     //    let wikiShortDescription =
                     //       getWikiShortDescription(wikiHtmlContent);

                     //    /**
                     //     *
                     //     * Now we get pictures
                     //     *    from ghost container
                     //     *
                     //     */

                     //    let wikiPictures = [];
                     //    wikiPictures = getWikiPictures(wikiHtmlContent);

                     //    /**
                     //     *
                     //     * Now let append
                     //     *    those contents
                     //     *
                     //     */

                     //    //    we create the container for wiki content;
                     //    createFullElement("div", "#location-" + datas.id, {
                     //       id: "wiki-div",
                     //    });

                     //    /**
                     //     *
                     //     * We append short description
                     //     *
                     //     */
                     //    createFullElement(
                     //       "p",
                     //       `#location-${datas.id} #wiki-div`,
                     //       {
                     //          textContent: wikiShortDescription.textContent,
                     //       }
                     //    );

                     //    /**
                     //     *
                     //     *
                     //     * Now we append pictures
                     //     *       and their links to image spource
                     //     *
                     //     */

                     //    appendWikiPicsAndLinks(wikiPictures, datas);

                     //    /**
                     //     *
                     //     * there we append a link to
                     //     *    wikipedia page of the city
                     //     */
                     //    addWikiLink(datas, cityInputFormated);
                     // });
                  });
            }
         });
   } while (!searchedWeather || !randomSuccess);
});
