//!! Запросы к сторонему api с базой данных о фильмах

export const BASE_URL = '';
const checkResponse = (response) => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)

