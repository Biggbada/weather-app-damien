/**
 *
 *
 *    there we define functions,
 *       before exporting them in an appropriate js file
 *
 *
 *
 *
 *
 */
// WE DEFINE FUNCTIONS
//

/**
 *
 * @param {string} shortDescription
 *
 * creates the container for wiki content
 */

/**
 *
 * @param {HTMLElement} wikiHtmlContent
 * @returns the wikipedia short description
 */
function getWikiShortDescription(wikiHtmlContent) {
   let shortDescription = wikiHtmlContent.querySelector(".shortdescription");
   return shortDescription;
}

/**
 *
 * @param {JSON} json
 * @returns wikiContent (html content)
 */
function getwikiContent(json) {
   for (const property in json.parse.text) {
      wikiContent = json.parse.text[property];
      return wikiContent;
   }
}

function serveWikiHtmlContent(wikiContent) {
   let ghostDiv = document.createElement("div");
   ghostDiv.innerHTML = wikiContent;
   ghostDiv.id = "wiki-ghost-div";
   return ghostDiv;
}

/** On ajoute le lien Wikipedia
 *
 * @param {JSON} datas
 * @param {string} cleanedCityName
 */
function addWikiLink(datas, cleanedCityName) {
   createFullElement("a", `#location-${datas.id} #wiki-div`, {
      textContent: `See more on Wikipedia`,
      href: `https://fr.wikipedia.org/wiki/${cleanedCityName}`,
      target: "blank",
   });
}

/**on scrap les images wikipedia
 *
 * @param {htmlElement} htmlElement
 *
 */
function getWikiPictures(htmlElement) {
   let wikiPictures = [];
   wikiPictures = htmlElement.querySelectorAll("img");
   return wikiPictures;
}

//****************************************************** */
function getShortDescriptionFromWikipedia(wikiDatas) {
   let returnData = [];
   return returnData;
}
//****************************************************** */
function createEnvironment() {
   createFullElement("h1", "body", {
      textContent: "Welcome",
      id: "welcome-title",
   });
   createFullElement("div", "body", {
      id: "main-container",
   });

   createFullElement("h2", "#main-container", {
      textContent: "Search your location",
   });
   createFullElement("form", "#main-container", {
      id: "search-form",
      method: "post",
      action: "none",
   });
   createFullElement("div", "#search-form", {
      id: "inputs-container",
   });
   createFullElement("input", "#inputs-container", {
      type: "text",
      name: "weather-form",
      id: "city-input",
      placeholder: "City",
   });
   createFullElement("input", "#inputs-container", {
      type: "text",
      name: "weather-form",
      id: "country-input",
      placeholder: "Country",
   });
   createFullElement("button", "#inputs-container", {
      type: "submit",
      name: "weather-form",
      id: "submit-button",
      textContent: `Search`,
   });
   createFullElement("form", "#main-container", {
      id: "random-search",
      method: "post",
      action: "none",
   });
   createFullElement("div", "#random-search", {
      id: "random-search-container",
   });
   createFullElement("button", "#random-search", {
      type: "submit",
      name: "random-search-form",
      id: "random-search-submit",
      textContent: `Random search`,
   });
}

//****************************************************** */
function createCitiesContainers() {
   createFullElement("h3", "#main-container", {
      textContent: "Locations:",
   });
   createFullElement("ol", "#main-container", {
      id: "suggestions",
   });
   createFullElement("div", "#suggestions", {
      className: "cities-container",
      id: "cities-container",
   });
}
//****************************************************** */
/**
 *
 * @param {string} tagName
 * @param {string} source
 * @param {string} properties
 * @returns an html element with properties you want
 */
export function createFullElement(tagName, source, properties) {
   const element = document.createElement(tagName);
   const sourceElement = document.querySelector(source);
   sourceElement.appendChild(element);

   for (const property in properties) {
      element[property] = properties[property];
   }

   return element;
}
/**
 *
 * @param {Array} picturesArray
 * @param {JSON} datas
 *
 * displays each picture with his link
 */
function appendWikiPicsAndLinks(picturesArray, datas) {
   picturesArray.forEach((element, i) => {
      let wikiPicHref = element.parentElement;
      let wikiPicLink = wikiPicHref.href?.replace(
         "http://127.0.0.1:5501",
         "https://en.wikipedia.org/"
      );
      createFullElement("a", `#location-${datas.id} #wiki-div`, {
         href: wikiPicLink,
         target: "blank",
         id: `location-${datas.id}` + "-wikilink-" + [i],
      });

      createFullElement("img", `#location-${datas.id}` + "-wikilink-" + [i], {
         src: element.src,
         className: "wiki-pics",
         id: `location-${datas.id}` + "-wikipic-" + [i],
      });
   });
}
