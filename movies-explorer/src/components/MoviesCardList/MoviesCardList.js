import React from 'react';
import { useLocation } from 'react-router-dom';


import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({items, filter, onLikeClick, onDeleteClick,  index, uploadingCards}) {
    const location  = useLocation();
    
    const movieFilter = items.filter((item) => item.duration <= 40);
    const cardsToRender = filter ? movieFilter.slice(0, index) : items.slice(0, index);
    const isDisabled = () => {
        return index > cardsToRender.length
    }
return(
    <>
        <ul className='cards'>
            {
            cardsToRender.map
            ((item) => (
                
                <MoviesCard 
                    key={item.id || item._id}
                    item={item}
                    onLikeClick={onLikeClick}
                    onDeleteClick={onDeleteClick}
                    saved={item.saved}
                />
            ))}
        </ul>
        <div className='movies__container'>

            {location.pathname === '/saved-movies' &&  (
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