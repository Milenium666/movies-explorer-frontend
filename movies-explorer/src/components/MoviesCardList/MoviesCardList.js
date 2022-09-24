import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ items, savedItems, filter, onLikeClick, onDeleteClick, index, uploadingCards }) {
    const location = useLocation();
    const movieFilter = items.filter((item) => item.duration <= 40);
    let cardsToRender = filter ? movieFilter.slice(0, index) : items.slice(0, index);
    cardsToRender.map((movie) => {
        movie.saved = false
        savedItems.forEach(savedMovie => {
            if (savedMovie.movieId === (movie.id || movie.movieId)) {
                movie.saved = true;
            }
        })
    })
    const isDisabled = () => {
        return index > cardsToRender.length
    }
    return (
        <>
            <ul className='cards'>
                {
                    cardsToRender.map
                        ((item) => (
                            <MoviesCard
                                key={item.id || item._id}
                                item={item}
                                saved={item.saved}
                                onLikeClick={onLikeClick}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
            </ul>
            <div className='movies__container'>
                {location.pathname === '/saved-movies' && (
                    <button className='movies__button_hidden'
                        type='button'
                    >Еще</button>
                )}
                {location.pathname === '/movies' && (
                    <button className={`movies__button 
                ${index > cardsToRender.length ? 'movies__button_hidden' : ''}
                `}
                        type='button'
                        onClick={uploadingCards}
                        disabled={isDisabled()}
                    >Еще</button>
                )}
            </div>
        </>
    )
}

export default MoviesCardList;