const directGeocodingApiRoot =
   "https://api.openweathermap.org/geo/1.0/direct?q=";
const reverseDirectGeocodingApiRoot =
   "https://api.openweathermap.org/geo/1.0/reverse?";
const oneCallApiRoot = "https://api.openweathermap.org/data/2.5/weather?";
const directGeocodingApiKey = "db01a2cdeec12abd2aaf6de10f970d06";
const oneCallApiKey = "c9eccf23c97be99196bb439d594c31e8";
const citySearch = document.querySelector("#city-input");
const citySubmit = document.querySelector("form");

citySearch.value = "dijon";

citySubmit.addEventListener("submit", (event) => {
   event.preventDefault();
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
