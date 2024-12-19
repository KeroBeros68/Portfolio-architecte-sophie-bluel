class Api {  
    constructor() {
        this.host = 'http://localhost:5678/api/'; 

    }

    //Method

    async get(path, headers) {
        try{
            let response = await fetch(this.host + path, {
                method: 'GET',
                headers: headers,
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }                              
            return response;
        } catch (error) {
            return null;
        }
    }

    async push(path, headers, body) {
        try{
            let response = await fetch(this.host + path, {
                method: 'POST',
                headers: headers,
                body: body,
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }                              
            return response;
        } catch (error) {
            console.log(error.message)
            switch (error.message) {
                case 'Erreur HTTP : 401' :
                    errorLogmessage();
                    break;
                case 'Erreur HTTP : 404' :
                    errorLogmessage();
                    break;
                default:
                    alert('Une erreur est survenue: ' + error);
                    break;
            };
            return null;
        }
    }
    
    async delete(path, headers, body) {
        try{
            let response = await fetch(this.host + path, {
                method: 'DELETE',
                headers: headers,
                body: body,
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }                              
            return response;
        } catch (error) {
            console.log(this.host + path)
            return null;
        }
    }

}
