async function main() {
    try {
        // Récupérer la galerie depuis localStorage
        const gallery = await fetchGallery();

        // Récupérer les catégories depuis l'API
        const categories = await fetchCategories();
        
        // Afficher la galerie et générer les filtres
        showGallery(gallery);
        generateFilters(categories);

        // Ajouter les écouteurs sur les boutons
        const buttons = document.querySelectorAll('.filterButton');
        buttons.forEach(button => {
            button.addEventListener('click', event => {
                const filterName = event.target.innerText; // Récupérer le texte du bouton
                filter(filterName, gallery, categories); // Appliquer le filtre
            });
        });

        console.log('Token dans localStorage :', window.localStorage.getItem("token"));
    }catch (error) {
        console.error('Une erreur est survenue :', error);
        alert('Une erreur est survenue lors du chargement. Veuillez réessayer plus tard.');
    }
}

main();