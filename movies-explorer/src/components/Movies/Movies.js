import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({ cards, filter, setFilter, isLoading}) {
    console.log(cards)

    return(
        <section className='movies'>
            <SearchForm 
                filter={filter}
                setFilter={setFilter}
            
            />

            
            <MoviesCardList 
            items={cards}
            filter={filter}
            />


            

        </section>
    )
}

export default Movies;