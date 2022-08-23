import React from 'react';
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';




function SavedMovies({filter, setFilter, savedCards, onDeleteClick}) {
    // console.log(filter, 'filter')
    // console.log(setFilter, 'setFilter')
    // console.log(savedCards, 'savedCards')
    // console.log(onDeleteClick, 'savedCards')

    return(
        <section className='saved-movies'>
            <SearchForm 
                filter={filter}
                setFilter={setFilter}
                />
            <MoviesCardList
                items={savedCards}
                filter={filter}
                // savedCards={savedCards}
                onDeleteClick={onDeleteClick}


            />
            
        </section>
    )
}

export default SavedMovies;