import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import convertDuration from '../../utils/convertDuration';


function MoviesCard({ item, onLikeClick, onDeleteClick }) {
    const location = useLocation();
    const handleSaveMovie = () => {
        
        onLikeClick(item)
    }
    const handleDeleteSaveMovie = () => {
        onDeleteClick(item)
    }
  

    return (
        <li className='card' >
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
                        className={item.saved ? 'card__like-active' : 'card__like'}
                        onClick={item.saved ? handleDeleteSaveMovie : handleSaveMovie}
                    ></button>
                )}
                {location.pathname === '/saved-movies' && (
                    <button type='button'
                        className='card__delete-saved-film'
                        onClick={handleDeleteSaveMovie}
                    ></button>
                )}
            </div>
            <a
                target='_blank'
                href={item.trailerLink}
                className="card__link-image" rel="noreferrer">
                <img
                    className='card__image'
                    src={item.image}
                    alt={item.nameRU}
                />
            </a>
        </li>
    )
}

export default MoviesCard;