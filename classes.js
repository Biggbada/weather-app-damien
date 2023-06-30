class Index {
    constructor() {

        this.productKey = "";


        this.searchBar = {
            balise: "input",
            attributes: ["text"],
            class: "search_box",
        }
    }
    
    createSearchBox(element) {
        let mySearchBar = document.createElement(this.searchBar.balise);
        mySearchBar.type = this.searchBar.type;
        mySearchBar.class = this.searchBar.class;
        
        element.append(mySearchBar);
    };
};


let page = new Index();
let conteneur = document.getElementById('contenu')

document.getElementById('submit-btn').addEventListener('click', function() {
    page.createSearchBox(conteneur);
    
} )