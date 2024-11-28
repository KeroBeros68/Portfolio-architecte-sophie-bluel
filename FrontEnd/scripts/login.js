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
        window.localStorage.setItem("token", data.token);
        window.location.href = './index.html';
    } catch (error) {
        switch (error.message) {
            case '401' :
                alert('Mot de passe incorrect');
                break;
            case '404' :
                alert('Utilisateur inconnu');
                break;
            default:
                alert('Une erreur est survenue: ' + error);
                break;
        };
    };
};



const loginForm = document.querySelector('.login');

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const loginInfo = {
        email : event.target.querySelector('#email').value,
        password : event.target.querySelector('#password').value
    };

    loginFetch(loginInfo);


});