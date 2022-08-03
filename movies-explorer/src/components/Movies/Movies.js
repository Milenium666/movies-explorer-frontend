import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ cards 
        //    ,filter, setFilter         
}) {
    const [loading, setLoading] = React.useState(false)
    
    const handleLoadClick = () => setLoading(!loading);
    return(
        <section className='movies'>
            <SearchForm 
                // filter={filter}
                // setFilter={setFilter}
            
            />
            <MoviesCardList cards={cards}
                // filter={filter}
            
            />


            <div className='movies__container'>
                <button className='movies__button' type='button' onClick={handleLoadClick}>Еще</button>
            </div>
            { loading && <Preloader /> }

        </section>
    )
}

export default Movies;