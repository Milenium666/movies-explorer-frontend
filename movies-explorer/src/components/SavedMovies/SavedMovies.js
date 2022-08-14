import React from 'react';
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';




function SavedMovies({filter, setFilter, savedCards}) {
    console.log(savedCards)
    return(
        <section className='saved-movies'>
            <SearchForm 
                filter={filter}
                setFilter={setFilter}
                />
            <MoviesCardList
                filter={filter}
                savedCards={savedCards}
                items={savedCards}

            />
            
        </section>
    )
}

export default SavedMovies;