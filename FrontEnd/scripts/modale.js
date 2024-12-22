function openModale() {
    let modale = document.querySelector('#modale');
    modale.removeAttribute('style');
    modale.setAttribute('aria-hidden', 'false'); 
    modale.addEventListener('click', closeModale);
    document.querySelector('#close-modale').addEventListener('click', closeModale);
    document.querySelector('#modale-wrapper').addEventListener('click', function stopPropagation(e) {
        e.stopPropagation();
    });
    modaleGallery();
}

function closeModale() {
    let modale = document.querySelector('#modale');
    modale.setAttribute('style','display:none');
    modale.setAttribute('aria-hidden', 'true');
    document.querySelector('#modale-form').setAttribute('style','display:none');
    let element = document.querySelector('.landing-modale');
    if (element) {
        element.remove();
    }
    let validateButton = document.querySelector('#add-validation');
    validateButton.classList.add('validation-nok');
    validateButton.removeEventListener('click', postPhoto);
    document.querySelector('#backward-modale').setAttribute('style', 'display:none');
    modale.removeEventListener('click', closeModale);
    document.querySelector('#close-modale').removeEventListener('click', closeModale);
    resetForm()
}


async function modaleGallery() {
    // Récupérer la galerie
    let api = new Api();
    // Afficher la galerie
    gallery = await api.get('works');
    gallery = await gallery.json();

    document.querySelector('#modale-title').innerText = 'Galerie photo';
    let galleryContainer = document.createElement('div');
    galleryContainer.className = 'modale-gallery';

    let inputGallery = document.createElement('div');
    inputGallery.className = 'input-modale';
    inputGallery.innerHTML = '<input id="add-input" type="button" value="Ajouter une photo"></input>';
    let main = document.createElement('div');
    main.className = ('main-modale landing-modale');
    main.appendChild(galleryContainer);
    main.appendChild(inputGallery);
    document.querySelector('#modale-wrapper').appendChild(main);

    gallery.forEach(element => {
        let articleElement = document.createElement('article');
        let imageElement = document.createElement('img');
        let trashElement = document.createElement('div');
        articleElement.id = 'article' + element.id;
        trashElement.className = ('trash');
        trashElement.id = 'id' + element.id;
        trashElement.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

        imageElement.src = element.imageUrl;
        articleElement.appendChild(imageElement);
        articleElement.appendChild(trashElement);

        galleryContainer.appendChild(articleElement);
        document.querySelector(`#id${element.id}`).addEventListener('click', event => {
            console.log(element.id);
            deletePhoto(element.id);
        });
    })

    document.querySelector('#add-input').addEventListener('click', modaleAddPage);
}

async function modaleAddPage() {
    document.querySelector('.landing-modale').remove();
    document.querySelector('#modale-title').innerText = 'Ajout photo';
    document.querySelector('#modale-form').removeAttribute('style');
    document.querySelector('#backward-modale').removeAttribute('style');
    document.querySelector('#backward-modale').addEventListener('click', backwardModale);

    // Récupérer les catégories
    let categories = new Api();
    categories = await categories.get('categories');
    categories = await categories.json();
    document.querySelector('#options').innerHTML = '';
    categories.forEach(element => {
        let option = document.createElement('option');
        option.setAttribute('value', element.id);
        option.innerText = element.name;
        document.querySelector('#options').appendChild(option);
    });

    let fileInput = document.querySelector('#button-addPhoto');
    fileInput.addEventListener('change', () => {
        showNewPhoto(fileInput);
    })

    let nameInput = document.querySelector('#newPhoto-name');
    fileInput.addEventListener('change', () => {
        updateButtonState(fileInput,nameInput)
    });
    nameInput.addEventListener('input',() => {
        updateButtonState(fileInput,nameInput)
    });
    
}
function updateButtonState(fileInput,nameInput) {
    let isImageSelected = fileInput.files.length > 0;
    let isNameFilled = nameInput.value.trim() !== '';
    let validateButton = document.querySelector('#add-validation');
    console.log(isImageSelected)
    if (isImageSelected && isNameFilled) {            
        validateButton.classList.remove('validation-nok');
        validateButton.addEventListener('click', postPhoto);
    } else {
        validateButton.classList.add('validation-nok');
        validateButton.removeEventListener('click', postPhoto);
    }
}

function backwardModale() {
    document.querySelector('#modale-form').setAttribute('style', 'display:none');
    document.querySelector('#backward-modale').setAttribute('style', 'display:none');
    document.querySelector('#backward-modale').removeEventListener('click', backwardModale);
    modaleGallery();
    resetForm()
    let validateButton = document.querySelector('#add-validation');
    validateButton.classList.add('validation-nok');
    validateButton.removeEventListener('click', postPhoto);
}

function resetForm() {
    let form = document.querySelector('#modale-form');
    form.reset();
    document.querySelector('.add-container').removeAttribute('style');
    let element = document.querySelector('#new-photo');
    if (element) {
        element.remove();
    }
}

function showNewPhoto(fileInput) {
    let existingPhoto = document.querySelector('#new-photo');
    if (existingPhoto) {
        existingPhoto.remove();
    }
    let files = fileInput.files;
    console.log(files[0])
    if ((files[0].type.includes('jpg') || files[0].type.includes('jpeg') || files[0].type.includes('png')) && files[0].size < 4194304) {
        let newPhoto = document.createElement('img');
        newPhoto.setAttribute('id','new-photo');
        newPhoto.src = URL.createObjectURL(files[0]);
        document.querySelector('#add-container').appendChild(newPhoto);
        document.querySelector('.add-container').setAttribute('style','display:none');
    }
}

async function postPhoto(event) {
    event.preventDefault();

    let image = document.querySelector('#button-addPhoto').files[0];
    let title = document.querySelector('#newPhoto-name').value;
    let categorie = document.querySelector('#options').value;

    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", categorie);

    let token = window.localStorage.getItem('token');

    let headers ={
            'Authorization': `Bearer ${token}`
        };
    let api = new Api();
    await api.push('works',headers,formData);
    resetForm();
    // Afficher la galerie
    console.log('test')
    gallery = await api.get('works');
    gallery = await gallery.json();
    showGallery(gallery);
    document.querySelector('#add-validation').removeEventListener('click', postPhoto);
}

async function deletePhoto(element) {  
    let token = window.localStorage.getItem('token');

    let headers ={
            'Authorization': `Bearer ${token}`
        };

    let api = new Api();
    api.delete(`works/${element}`,headers);
    // Afficher la galerie
    gallery = await api.get('works');
    gallery = await gallery.json();
    showGallery(gallery);
    article = document.getElementById(`article${element}`);
    article.remove();
}
