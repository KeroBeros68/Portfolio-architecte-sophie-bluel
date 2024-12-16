function showGallery(array) {

    document.querySelector('.gallery').innerHTML= ""; // Efface la gallerie
    array.forEach(element => {
        let figureElement = document.createElement('figure');
        let imageElement = document.createElement('img');
        let captionElement = document.createElement('figcaption');

        imageElement.src = element.imageUrl;
        captionElement.innerHTML = element.title;
        figureElement.appendChild(imageElement);
        figureElement.appendChild(captionElement);

        document.querySelector('.gallery').appendChild(figureElement);
    })
}

function generateFilters(categories, gallery) {
    // Ajouter les boutons filtres 
    let containerElement = document.querySelector('.filters');
    categories.forEach(element => {
        let filterElement = document.createElement('button');
        filterElement.className = `filter-button filter${element.id}`;
        filterElement.setAttribute('id', element.name);
        filterElement.innerText = element.name;
        containerElement.appendChild(filterElement);
    })
    // Ajouter les écouteurs sur les boutons
    let buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            let filterName = event.target.innerText;
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
    
    let filteredData = data.filter(data => data.categoryId === id);  
    showGallery(id === 0 ? data : filteredData);
}