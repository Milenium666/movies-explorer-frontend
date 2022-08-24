import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({ cards, filter, setFilter, isLoading, onLikeClick, onDeleteClick}) {
    return(
        <section className='movies'>
            <SearchForm 
                filter={filter}
                setFilter={setFilter}
            />
            <MoviesCardList 
                items={cards}
                filter={filter}
                onLikeClick={onLikeClick}
                onDeleteClick={onDeleteClick}
            />
        </section>
    )
}

export default Movies;