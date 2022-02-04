//!! запросы к нашему самописному API

export const BASE_URL = 'https://movies-explorer.elena.nomoredomains.rocks/api';
const checkResponse = (response) => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)


//post /signup (name, email, password )
export const register = ({name, email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})

    })
    .then(checkResponse)
};

  //post /signin(email, password)
export const login = ({email, password}) => {

    return fetch(`${BASE_URL}/signin`, {
      // credentials: 'include',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
    })
    .then(checkResponse)
};


export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      // credentials: 'include',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
    })
    .then(checkResponse)

};






