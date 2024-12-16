class Api {  
    constructor(path, headers, body) {
        this.host = 'http://localhost:5678/api/'; 
        this.path = path;
        this.headers = headers;
        this.body = body;
    }

    //Method

    async get() {
        try{
            let response = await fetch(this.host + this.path, {
                method: 'GET',
                headers: this.headers,
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }                              
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            return null;
        }
    }

    async push() {
        try{
            let response = await fetch(this.host + this.path, {
                method: 'POST',
                headers: this.headers,
                body: this.body,
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }                              
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            console.log(this.host + this.path)
            return null;
        }
    }
    
    async delete() {
        try{
            let response = await fetch(this.host + this.path, {
                method: 'DELETE',
                headers: this.headers,
                body: this.body,
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }                              
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            console.log(this.host + this.path)
            return null;
        }
    }

}

/* async function loginFetch(body) {
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

;
    } catch (error) {
        switch (error.message) {
            case '401' :
                errorLogmessage();
                break;
            case '404' :
                errorLogmessage();
                break;
            default:
                console.log('Une erreur est survenue: ' + error);
                break;
        };
    };
}; */


