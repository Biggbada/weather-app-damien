console.log("test");
const meteoConceptToken =
   "66c9531e068cf34224362c376d250bba937cdbd07f3a5f029a1fb44f7cd1b1b9";

citySearch = document.querySelector("#city-input");
const meteoConceptCityRoot = `./php/consume-meteo-concept.php?location=${citySearch.value}`;
// const meteoConceptCityRoot = `http://api.meteo-concept.com/api/location/cities?token=${meteoConceptToken}&search=`;
citySubmit = document.querySelector("form");
console.log(citySearch);
console.log(citySubmit);
let searchedCity = "";

citySubmit.addEventListener("submit", (event) => {
   event.preventDefault();
   searchedCity = citySearch.value;
   const meteoConceptCityQuery = meteoConceptCityRoot + searchedCity;
   console.log("ok");
   console.log("city: " + searchedCity);
   console.log("root: " + meteoConceptCityRoot);
   console.log("query: " + meteoConceptCityQuery);
   fetch(meteoConceptCityQuery)
      .then((response) => response.json)
      .then((datas) => console.log(datas));
});
