function showModale() {
    const modale = `
        <aside id="modale" class="modale" role="dialog" aria-modal="false" aria-labelledby="modaleTitle">
            <div class="modale-Wrapper">
                <div>
                    <button id="close-Modale"><i class="fa-solid fa-xmark fa-xl"></i></button>
                </div>
                <h2 id="modaleTitle">Galerie photo</h2>
                <div class='main-Modale'>
                    <div class="modale-Gallery">
                    </div>
                </div>
                <input type="button" value="Ajouter une photo"></input>
            </div>
        </aside>
        `;

    document.body.insertAdjacentHTML('beforeend', modale);

    showModaleGallery();
    document.querySelector('#modale').addEventListener('click', closeModale);
    document.querySelector('#close-Modale').addEventListener('click', closeModale);
    document.querySelector('.modale-Wrapper').addEventListener('click', stopPropagation);
}

function showModaleGallery() {
    const gallery = JSON.parse(window.localStorage.getItem("gallery"));

    gallery.forEach(element => {
        const articleElement = document.createElement('article');
        const imageElement = document.createElement('img');
        const trashElement = '<div class="trash"><i class="fa-regular fa-trash-can"></i></div>'

        imageElement.src = element.imageUrl;
        articleElement.appendChild(imageElement);
        articleElement.innerHTML += trashElement;

        document.querySelector('.modale-Gallery').appendChild(articleElement);
    })
}

function closeModale() {
        const aside = document.getElementById('modale');
        aside.remove();
}

function stopPropagation(e) {
    e.stopPropagation();
}