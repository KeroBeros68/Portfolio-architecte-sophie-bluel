

fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        showGallery(data); // Appeler la fonction avec les données résolues
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });
