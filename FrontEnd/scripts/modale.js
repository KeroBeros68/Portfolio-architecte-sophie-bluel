function showModale() {
    document.querySelector('#modale').removeAttribute('style');
    ModaleGallery();
    document.querySelector('#modale').addEventListener('click', closeModale);
    document.querySelector('#close-Modale').addEventListener('click', closeModale);
    document.querySelector('#modale-Wrapper').addEventListener('click', function stopPropagation(e) {
        e.stopPropagation();
    });
}

function closeModale() {
    document.querySelector('#modale').setAttribute('style','display:none');
    document.querySelector('.modale-Gallery').innerHTML = ''; 
    document.querySelector('#modale').removeEventListener('click', closeModale);
    document.querySelector('#close-Modale').removeEventListener('click', closeModale);
}


function ModaleGallery() {
    const gallery = JSON.parse(window.localStorage.getItem('gallery'));
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'modale-Gallery';

    const inputGallery = document.createElement('div');
    inputGallery.className = 'input-Modale';
    inputGallery.innerHTML = '<input type="button" value="Ajouter une photo"></input>';

    gallery.forEach(element => {
        const articleElement = document.createElement('article');
        const imageElement = document.createElement('img');
        const trashElement = '<div class="trash"><i class="fa-regular fa-trash-can"></i></div>'

        imageElement.src = element.imageUrl;
        articleElement.appendChild(imageElement);
        articleElement.innerHTML += trashElement;

        galleryContainer.appendChild(articleElement);
    })

    document.querySelector('.main-Modale').appendChild(galleryContainer);
    document.querySelector('.main-Modale').appendChild(inputGallery);
}


