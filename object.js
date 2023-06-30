const maVoiture = new Object();
maVoiture.fabricant = "ford";
maVoiture.modele = "mustang";
maVoiture.annee = 1969;
console.log(maVoiture);

delete maVoiture.fabricant;
console.log(maVoiture);


const Animal = {
    type: "vertébré",
    afficherType: function() {
        console.log(this.type);
    }
}
Animal.afficherType();


const maVoiture2 = {
    fabricant: "renault",
    modele: "4l",
    annee: 1982,
}

console.log(maVoiture2);

maVoiture2.fabricant = "peugeot"
console.log(maVoiture2);