let arrayTest = "";
let categories = "";

fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        showGallery(data); // Appeler la fonction avec les données résolues
        arrayTest = data

    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        categories = data;
    })



generateFilters();

const buttons = document.querySelectorAll('.filterButton');

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const button = event.target.innerText;
        filter(button,arrayTest,categories);
    });
});
