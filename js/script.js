const inputCP = document.querySelector(".cp");
// Séléctionne l'élément HTML avec la classe "cp"
const selectVille = document.querySelector(".ville");
// Séléctionne l'élément HTML avec la classe "ville"


    var map = L.map('map').setView([51.505, -0.09], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: `<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`
    }).addTo(map);


inputCP.addEventListener("input", () => {
    // Récupère la valeur entrée dans le champ de code postal
    let value = inputCP.value;
    // Vide le contenu actuel de la liste de sélection de ville
    selectVille.innerText = null;
    // Effectue une requête fetch vers l'API de géolocalisation avec le code postal saisi
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,codesPostaux,codeRégion&format=json&geometry=centre`)
        // Convertit la réponse en format JSON
        .then((response) => response.json())
        // Une fois que les données JSON sont disponibles
        .then((data) => {
            // Affiche les données dans la console (pour debug si besoin)
            console.log(data);
            // Parcours chaque objet "ville" dans les données récupérées
            data.forEach((ville) => {
                // Crée un nouvel élément d'option HTML
                let option = document.createElement("option");
                // Définit la valeur de l'option comme le code de la ville
                option.value = `${ville.code}`;
                // Définit le texte affiché de l'option comme le nom de la ville
                option.innerHTML = `${ville.nom}`
                // Ajoute l'option à la liste de séléction de ville
                selectVille.appendChild(option);
            })
        })
})

selectVille.addEventListener("input", () => {
        
    let selectValue = selectVille.innerText;
    console.log(selectValue); ///// Récupère tout les options: Faire en sorte de ne récupérer qu'une seule option, récupérer la longitude et la latitude, changer la map en conséquence

    fetch(`https://geo.api.gouv.fr/communes?nom=${selectValue}&fields=code,nom,centre&format=json`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // map.setView([])
        })
})