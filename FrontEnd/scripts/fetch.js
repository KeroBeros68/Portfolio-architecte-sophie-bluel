async function fetchGallery() {
    try {        
        const gallery = window.localStorage.getItem("gallery"); 

        // Si la galerie n'existe pas dans localStorage, la récupérer depuis l'API
        if (!gallery) {
            const response = await fetch('http://localhost:5678/api/works');
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }                              
            const data = await response.json();
            window.localStorage.setItem("gallery", JSON.stringify(data)); // Sauvegarder dans localStorage
            return data;
        } else {
            return data = JSON.parse(gallery);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return null;
    }
}

async function fetchCategories() {
    try {
        const categories = window.localStorage.getItem("categories");
        
        // Si la galerie n'existe pas dans localStorage, la récupérer depuis l'API
        if (!categories) {
            const response = await fetch('http://localhost:5678/api/categories');
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const data = await response.json();
            window.localStorage.setItem("categories", JSON.stringify(data)); // Sauvegarder dans localStorage
            return data;
        } else {
            return data = JSON.parse(categories);
        }   
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return null;
    }
}

async function loginFetch(body) {
    try{
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        window.localStorage.setItem("token", data.token); // Sauvegarder dans localStorage
        window.location.href = './index.html';
    } catch (error) {
        switch (error.message) {
            case '401' :
                errorLogmessage();
                break;
            case '404' :
                errorLogmessage();
                break;
            default:
                console.log('Une erreur est survenue: ' + error);
                break;
        };
    };
};
