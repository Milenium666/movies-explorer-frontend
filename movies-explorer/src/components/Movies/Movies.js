import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function Movies({ cards, filter, setFilter, isLoading, onLikeClick, onDeleteClick, handleSearchSubmit, 
    // searchTag, 
    width}) {
        const [index, setIndex] = React.useState(7);

    
        const fullScreen = width > 768;
        const mediumScreen = width <= 768 && width >= 480;
        const smallScreen = width < 480;

        React.useEffect(() => {
            if (fullScreen) {
            setIndex(7);
            }
            if (mediumScreen) {
            setIndex(7);
            }
            if (smallScreen) {
            setIndex(5);
            }
        }, [width, cards]);

    const uploadingCards = () => {
        if (smallScreen) {
            setIndex(index + 5)
        } else {
            setIndex(index + 7)
        }
    }

    return(
        <section className='movies'>
            <SearchForm 
                filter={filter}
                setFilter={setFilter}
                handleSearchSubmit={handleSearchSubmit}
                // searchTag={searchTag}
            />
            {isLoading && <Preloader></Preloader>}
            <MoviesCardList 
                items={cards}
                filter={filter}
                onLikeClick={onLikeClick}
                onDeleteClick={onDeleteClick}
                width={width}
                index={index}
                uploadingCards={uploadingCards}
            />
        </section>
    )
}

export default Movies;