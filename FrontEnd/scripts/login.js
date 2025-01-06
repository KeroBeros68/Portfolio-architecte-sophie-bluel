function logIn() {
    let loginForm = document.querySelector('.login');
    loginForm.addEventListener('submit', async event => {
        event.preventDefault();
        let loginInfo = {
            email : event.target.querySelector('#email').value,
            password : event.target.querySelector('#password').value
        };
        let headers = { 'Content-Type': 'application/json' }
        let api = new Api();
        let token = await api.push('users/login', headers , JSON.stringify(loginInfo));
        if (token != null) {
            token = await token.json();
            window.localStorage.setItem("token", token.token);
            window.location.href = './index.html';
        }
    });    
}

function errorLogmessage() {
    let parentElement = document.querySelector('#form-login');
    let errorElement = document.querySelector('#error-message');
    let referenceElement = document.querySelector('#submit-btn');
    let messageContainer = document.createElement('div');
    messageContainer.id = 'error-message';
    if (!errorElement) {
        messageContainer.innerHTML = '<p>Utilisateur ou mot de passe incorect</p>';
        messageContainer.className = 'errorMessage';
        parentElement.insertBefore(messageContainer,referenceElement);
    };
}

function logOut() {
    let logoutNav = document.querySelector('.logout-nav');
    logoutNav.addEventListener('click', event => {
        window.localStorage.removeItem('token');
        window.location.reload();
    });
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