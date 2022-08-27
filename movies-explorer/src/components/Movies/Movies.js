import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({ cards, filter, setFilter, setLoader, onLikeClick, onDeleteClick, handleSearchSubmit, searchTag, width}) {
    return(
        <section className='movies'>
            <SearchForm 
                filter={filter}
                setFilter={setFilter}
                handleSearchSubmit={handleSearchSubmit}
                searchTag={searchTag}
            />
            <MoviesCardList 
                items={cards}
                filter={filter}
                onLikeClick={onLikeClick}
                onDeleteClick={onDeleteClick}
                width={width}
            />
        </section>
    )
}

export default Movies;