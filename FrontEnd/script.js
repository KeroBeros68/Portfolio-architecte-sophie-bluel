

function AfficherGallery(tableau){
    
    document.querySelector(".gallery").innerHTML= ""; // Efface la gallerie

    for(i=0; i < tableau.length; i++){
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");

        imageElement.src = tableau[i].imageUrl;
        captionElement.innerHTML = tableau[i].title;

        figureElement.appendChild(imageElement)
        figureElement.appendChild(captionElement)

        document.querySelector(".gallery").appendChild(figureElement)
    }
}


fetch("http://localhost:5678/api/works")
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        AfficherGallery(data); // Appeler la fonction avec les données résolues
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    });
