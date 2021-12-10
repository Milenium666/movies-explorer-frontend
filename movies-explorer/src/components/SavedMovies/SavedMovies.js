import React from 'react';
import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoviesCard from '../MoviesCard/MoviesCard'


function SavedMovies() {
    return(
        <div>
            SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
            <MoviesCardList />
            <MoviesCard />
            </div>
    )
}

export default SavedMovies;