async function main() {
    try {
        // Récupérer la galerie
        const gallery = await fetchGallery();
        // Récupérer le token depuis le local Storage
        let token = window.localStorage.getItem('token');
        // Afficher la galerie
        showGallery(gallery);
        if (token != null) {
            logOut();
            hiddenElement();
            editionMode();
        } else {
            // Récupérer les catégories
            const categories = await fetchCategories();
            // Générer les filtres
            generateFilters(categories, gallery);
        }
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    };
}


function hiddenElement() {
    const elementArray = ['.filters','.loginNav','.logoutNav'];
    elementArray.forEach ( element => {
        const filterDiv = document.querySelector(element);
        filterDiv.classList.toggle('hidden');
    });
}

function editionMode() {
    const editionHeader = document.createElement('div');
    editionHeader.className = 'editionHeader';
    editionHeader.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';
    document.body.prepend(editionHeader);

    const parentElement = document.querySelector('.portfolioTitle');
    const editionButton = document.createElement('button');
    editionButton.className = 'editionBtn';
    editionButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Modifier';
    parentElement.appendChild(editionButton);
}

const currentPage = window.location.pathname;

if (currentPage.includes('index.html')) {
    main();
} else if (currentPage.includes('login.html')) {
    logIn();
}
