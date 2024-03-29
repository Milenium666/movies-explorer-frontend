import React from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';




function SavedMovies({ filter, setFilter, savedMovies, onDeleteClick, width, searchSaveResult, onSearch, searchSavedMovies, isLoading }) {
    return (
        <section
            className='saved-movies'
        >
            <SearchForm
                filter={filter}
                setFilter={setFilter}
                searchSavedMovies={searchSavedMovies}
            />
            {isLoading && <Preloader></Preloader>}
            <MoviesCardList
                items={onSearch === undefined ? savedMovies : searchSaveResult}
                savedItems = {savedMovies}
                filter={filter}
                onDeleteClick={onDeleteClick}
                width={width}
            />
        </section>
    )
}

export default SavedMovies;