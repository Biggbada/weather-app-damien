const oneCallApiRoot = "https://api.openweathermap.org/data/2.5/weather?";
const directGeocodingApiKey = "db01a2cdeec12abd2aaf6de10f970d06";
const directGeocodingApiRoot =
   "https://api.openweathermap.org/geo/1.0/direct?q=";
// const byCityQuery =
//    directGeocodingApiRoot +
//    citySearch.value +
//    "&limit=0&appid=" +
//    directGeocodingApiKey;

class City {
   constructor(name) {
      this.name = name;
   }
   async getCoordinates() {
      let coord;
      await fetch(
         directGeocodingApiRoot +
            this.name +
            "&limit=0&appid=" +
            directGeocodingApiKey
      )
         .then((response) => {
            return response.json();
         })
         .then((datas) => {
            console.log(datas);
            coord = {
               latitude: datas[0].lat,
               longitude: datas[0].lon,
            };
         });
      console.log(coord);
      return coord;
   }
}

class Weather {
   constructor(lat, lon) {
      this.lat = lat;
      this.lon = lon;
   }
   async getDailyMeteo() {
      const byGeoCoordinatesQuery = `${oneCallApiRoot}lat=${this.lat}&lon=${this.lon}&units=metric&appid=${directGeocodingApiKey}`;
      await fetch(byGeoCoordinatesQuery)
         .then((secondResponse) => {
            return secondResponse.json();
         })
         .then((donnees) => {
            console.log(donnees);
            this.displayMeteo(donnees);
            return donnees;
         });
   }
   displayMeteo(donnees) {
      const container = document.createElement("div");
      container.textContent = donnees.base;
      document.body.append(container);
      console.log(donnees);
   }
}
let testingCity = new City("chignin");
let getCoordinates = await testingCity.getCoordinates();
console.log(getCoordinates.latitude);
let test = new Weather(getCoordinates.latitude, getCoordinates.longitude);
test.getDailyMeteo();
