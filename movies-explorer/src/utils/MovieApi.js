//!! Запросы к сторонему api с базой данных о фильмах

import {MOVIE_API} from '../constants';


const checkResponse = (response) => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)


export const getMoviesFromSecondApi = (token) => {
    return fetch(`${MOVIE_API}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(checkResponse);
};

