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
        Accept : 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})

    })
    .then(this._checkResponse)
    //Потребуется для вывода ошибки
    // .then((res) => {
    //     // console.log(res)
    //     return res;
    //   });
    
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
    headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
    })
    .then(this._checkResponse)

}



    //!!patch /users/me ({ name, email })
    setUserInfo({ name, email }) {
        return fetch(`${this.address}/users/me`, {
            // credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({ name, email })
        })
        .then(this._checkResponse)
    }

    //!!get /movies
    getMovies() {
        return fetch(`${this.address}/movies`, {
            // credentials: 'include'
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
        })
        .then(this._checkResponse)
    }

  //!!при лайке на фильм идет запрос на добавление фильма 
    addSavedMovies(data) {
        return fetch(`${this.address}/movies`, {
            // credentials: 'include',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({  
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: data.image,
                trailerLink: data.trailerLink,
                thumbnail: data.thumbnail,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
                owner: data.user

                })

        })
        .then(this._checkResponse)
    }

    //!!delete /movies/:movieId ({ movieId })
    deleteSavedMovies(movieId) {
        return fetch(`${this.address}/movies/${movieId}`, {
            // credentials: 'include',
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
              }
        })
        .then(this._checkResponse)
    }



}

    const mainApi = new Api( {
        address: MAIN_API,
    });
export default mainApi;
