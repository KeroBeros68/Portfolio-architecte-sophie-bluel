function showGallery(tableau) {

    document.querySelector('.gallery').innerHTML= ""; // Efface la gallerie

    tableau.forEach(element => {
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
    const filters = ['Tous','Objets','Appartements','Hôtels & restaurants'];
    const parent = document.getElementById('portfolio');
    const gallery = document.querySelector('.gallery');
    const containerElement = document.createElement('div');

    containerElement.setAttribute('class', 'filters')
    filters.forEach(element => {
        const filterElement = document.createElement('button');

        filterElement.setAttribute('class', 'filterButton')
        filterElement.setAttribute('id', element === 'Hôtels & restaurants' ? 'Hotel' : `${element}`);
        filterElement.innerText = element;

        containerElement.appendChild(filterElement);
    })

    parent.insertBefore(containerElement,gallery);
}