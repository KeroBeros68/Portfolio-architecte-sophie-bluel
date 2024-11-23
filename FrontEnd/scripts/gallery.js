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

function generateFilters() {
    const parent = document.querySelector('.filters');

    const filtersHTML = `
        <button class="filterButton" id="Tous">Tous</button>
        <button class="filterButton" id="Objets">Objets</button>
        <button class="filterButton" id="Appartements">Appartements</button>
        <button class="filterButton" id="Hotel">Hotels & restaurants</button>
    `;

    parent.insertAdjacentHTML('beforeend', filtersHTML);
}

function filter(filter, data,categories) {
    let id = 0;
    categories.forEach(element => {
        if(filter === element.name){
            id = element.id;
        }
    });
    const filteredData = data.filter(data => data.categoryId === id);
    
    showGallery(id === 0 ? data : filteredData);
}