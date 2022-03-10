import { MAIN_API } from "../constants";

class Api {
    constructor({address}) {
        this.address = address;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);

    }

//post /signup (name, email, password )
register({name, email, password}) {
    return fetch(`${this.address}/signup`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})

    })
    .then(this._checkResponse)
};

  //post /signin(email, password)
login({email, password}) {

    return fetch(`${this.address}/signin`, {
      // credentials: 'include',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
};


checkToken (token) {
    return fetch(`${this.address}/users/me`, {
      // credentials: 'include',
    method: 'GET',
    headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
    })
    .then(this._checkResponse)

}

    //!!patch /users/me ({ name, email })
    setUserInfo({ name, email }, token) {
        return fetch(`${this.address}/users/me`, {
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
        return fetch(`${this.address}/movies`, {
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
        return fetch(`${this.address}/movies`, {
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
        return fetch(`${this.address}/movies/${movieId}`, {
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

    const mainApi = new Api( {
        address: MAIN_API,
    });
export default mainApi;
