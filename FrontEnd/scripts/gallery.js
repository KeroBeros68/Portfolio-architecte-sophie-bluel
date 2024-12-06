function showGallery(array) {

    document.querySelector('.gallery').innerHTML= ""; // Efface la gallerie

    array.forEach(element => {
        const figureElement = document.createElement('figure');
        const imageElement = document.createElement('img');
        const captionElement = document.createElement('figcaption');

        imageElement.src = element.imageUrl;
        captionElement.innerHTML = element.title;
        figureElement.appendChild(imageElement);
        figureElement.appendChild(captionElement);

        document.querySelector('.gallery').appendChild(figureElement);
    })
}

function generateFilters(categories, gallery) {
    // Ajouter les boutons filtres 
    const containerElement = document.querySelector('.filters');
    categories.forEach(element => {
        const filterElement = document.createElement('button');
        filterElement.className = `filterButton filter${element.id}`;
        filterElement.setAttribute('id', element.name);
        filterElement.innerText = element.name;
        containerElement.appendChild(filterElement);
    })
    // Ajouter les écouteurs sur les boutons
    const buttons = document.querySelectorAll('.filterButton');
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const filterName = event.target.innerText;
            filter(filterName, gallery, categories);
        });
    });
}


function filter(filter, data, categories) {
    let id = 0;
    categories.forEach(element => {
        if(filter === element.name) {
            id = element.id;
        }
    });
    
    const filteredData = data.filter(data => data.categoryId === id);  
    showGallery(id === 0 ? data : filteredData);
}