import React from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';




function SavedMovies({filter, setFilter, savedCards, onDeleteClick, width}) {
    return(
        <section 
            className='saved-movies'
        >
            <SearchForm 
                filter={filter}
                setFilter={setFilter}
            />
            <MoviesCardList
                items={savedCards}
                filter={filter}
                onDeleteClick={onDeleteClick}
                width={width}
                
            />
        </section>
    )
}

export default SavedMovies;