
class Api {
    constructor({address}) {
        this._address = address;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    
    }
    //!!get /users/me
    getUserData(token) {
        return fetch(`${this._address}/users/me`, {
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(this._checkResponse)
    }
    //!!patch /users/me ({ name, email })
    editProfile({ name, email }, token) {
        return fetch(`${this._address}/users/me`, {
            // credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, email })
        })
        .then(this._checkResponse)
    }

    //!!get /movies
    getMovies(token) {
        return fetch(`${this._address}/movies`, {
            // credentials: 'include'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(this._checkResponse)
    }

  //!!при лайке на фильм идет запрос на добавление фильма 
    addSavedMovies(country,
        director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN, token) {
        return fetch(`${this._address}/movies`, {
            // credentials: 'include',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({  country,
                director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN})

        })
        .then(this._checkResponse)
    }

    //!!delete /movies/:movieId ({ movieId })
    deleteSavedMovies(movieId, token) {
        return fetch(`${this._address}/movies/${movieId}`, {
            // credentials: 'include',
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
              }
        })
        .then(this._checkResponse)
    }



}

    const api = new Api( {
        address: 'https://movies-explorer.elena.nomoredomains.rocks/api/',
    });

export default api;
