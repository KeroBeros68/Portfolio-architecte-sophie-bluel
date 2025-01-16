async function main() {
    try {
        // Récupérer la galerie
        let api = new Api();
        // Récupérer le token depuis le local Storage
        let token = window.localStorage.getItem('token');
        // Afficher la galerie
        gallery = await api.get('works');
        gallery = await gallery.json();
        showGallery(gallery);
        if (token != null) {
            logOut();
            hiddenElement();
            editionMode();
        } else {
            // Récupérer les catégories
            categories = await api.get('categories');
            categories = await categories.json();
            // Générer les filtres
            generateFilters(categories, gallery);
        }
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    };
}

const currentPage = window.location.pathname;

if (currentPage.includes('index.html')) {
    main();
} else if (currentPage.includes('login.html')) {
    logIn();
}
