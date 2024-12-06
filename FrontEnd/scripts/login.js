function errorLogmessage() {
    const parentElement = document.querySelector('#formLogin');
    const errorElement = document.querySelector('.errorMessage');
    const referenceElement = document.querySelector('#submit-btn');
    const messageContainer = document.createElement('div');
    console.log(errorElement)
    if (!errorElement) {
        messageContainer.innerHTML = '<p>Utilisateur ou mot de passe incorect</p>';
        messageContainer.className = 'errorMessage';
        parentElement.insertBefore(messageContainer,referenceElement);
    };
}

function logIn() {
    const loginForm = document.querySelector('.login');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const loginInfo = {
            email : event.target.querySelector('#email').value,
            password : event.target.querySelector('#password').value
        };
        loginFetch(loginInfo);
    });    
}

function logOut() {
    const logoutNav = document.querySelector('.logoutNav');
    logoutNav.addEventListener('click', event => {
        window.localStorage.removeItem('token');
        window.location.reload();
    });
}
