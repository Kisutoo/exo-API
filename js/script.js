const inputCP = document.querySelector(".cp");
// Séléctionne l'élément HTML avec la classe "cp"
const selectVille = document.querySelector(".ville");
// Séléctionne l'élément HTML avec la classe "ville"


    var map = L.map('map').setView([47.5813,1.3049], 13);
    
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
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,codesPostaux,codeRégion,centre&format=json&geometry=centre`)
        // Convertit la réponse en format JSON
        .then((response) => response.json())
        // Une fois que les données JSON sont disponibles
        .then((data) => {
            // Affiche les données dans la console (pour debug si besoin)
            console.log(data);
            

            // On vient créer une option placeholder car la map ne se changera que lorsque l'on "cliquera" sur une ville. Or, en rentrant un code postal, la première ville 
            // récupérée se mettra automatiquement dans le select, ce qui ne modifiera pas dynamiquement la map.
            let optionPlaceHolder = document.createElement("option")
            // On change le texte du placeHolder
            optionPlaceHolder.innerHTML = "Séléctionner une ville";
            // On le place en tête dans le select, avant d'afficher les villes par code postal
            selectVille.appendChild(optionPlaceHolder);


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


selectVille.addEventListener("change", () => {
    // Dans le cas ou le select venait à changer via un clic sur une option

    let indexVille = selectVille.selectedIndex;
    // On récupère l'index de l'option sur laquelle on vient de cliquer

    let nomVille = selectVille.children[indexVille].innerText
    // On récupère ensuite le nom de la ville dans le select grace à l'index
    fetch(`https://geo.api.gouv.fr/communes?nom=${nomVille}&fields=code,nom,centre&format=json&limit=1`)
    // On effectue ensuite une autre requête fetch vers l'API de géolocalisation avec le nom de la ville cette fois ci
        .then((response) => response.json())
        // Convertit la réponse en format JSON
        .then((data) => {
        // Une fois que les données JSON sont disponibles
            console.log(data);
            // Affiche les données dans la console (pour debug si besoin)

            let lat = data[0].centre.coordinates[0]
            let long = data[0].centre.coordinates[1]
            // Récupère la longitude et la latitude de la ville pour modifier la map
            
            map.setView([long, lat], 15)
            // On change ensuite la vue de la map
        })
})
