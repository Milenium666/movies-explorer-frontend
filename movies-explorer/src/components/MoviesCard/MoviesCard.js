import React from 'react';

import './MoviesCard.css';

import getFullImageUrl from '../../utils/getFullImageUrl';
import convertDuration from '../../utils/convertDuration';
// import { MOVIE_API } from '../../constants'
import { useLocation } from 'react-router-dom';





function MoviesCard({ item, onLikeClick}) {
    // console.log(item, 'moviesCard')
    const location  = useLocation();
    const handleSaveMovie = () => {
        onLikeClick(item)
    }



    

  
    return(
        <li className='card'>
            <div className='card__discription'>
                <div className='card__list'>
                    <h1 className='card__title'>
                    {item.nameRU}
                    </h1>
                    <p className='card__duration'>
                    {convertDuration(item.duration)}
                    </p>
                </div>
                {location.pathname === '/movies' && (
                    <button 
                    type='button' 
                    className='card__like-active'
                    onClick={handleSaveMovie}
                    >
                    

                    </button>
                )}
                {location.pathname === '/saved-movies' && (
                    <button type='button' 
                    className='card__delete-saved-film'
                    ></button>
                )}
                
            </div>
            <a 
            target='_blank'
            href={item.trailerLink}
            className="card__link-image" rel="noreferrer">
                <img className='card__image' 
                src={getFullImageUrl(item.image)}
                // src={`${MOVIE_API}${item.image.url}`}
                alt={item.nameRU}
                />
             </a>
        </li>
    )
}

export default MoviesCard;