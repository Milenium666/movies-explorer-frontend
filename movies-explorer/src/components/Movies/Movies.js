import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';



function Movies() {
    return(
        <div>
            Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
            <SearchForm />
            <Preloader />
            <MoviesCardList />
            <MoviesCard />
            </div>
    )
}

export default Movies;