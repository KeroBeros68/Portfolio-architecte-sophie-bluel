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


function hiddenElement() {
    const elementArray = ['.filters','.login-nav','.logout-nav'];
    elementArray.forEach ( element => {
        const filterDiv = document.querySelector(element);
        filterDiv.classList.toggle('hidden');
    });
}

function editionMode() {
    const editionHeader = document.createElement('div');
    editionHeader.className = 'edition-header';
    editionHeader.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';
    document.body.prepend(editionHeader);

    const parentElement = document.querySelector('.portfolio-title');
    const editionButton = document.createElement('button');
    editionButton.className = 'edition-btn';
    editionButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Modifier';
    parentElement.appendChild(editionButton);

    editionButton.addEventListener('click', openModale);
}

const currentPage = window.location.pathname;

if (currentPage.includes('index.html')) {
    main();
} else if (currentPage.includes('login.html')) {
    logIn();
}
