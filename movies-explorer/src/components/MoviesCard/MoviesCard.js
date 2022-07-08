import React from 'react';

import './MoviesCard.css';

import getFullImageUrl from '../../utils/getFullImageUrl';
import convertDuration from '../../utils/convertDuration';



function MoviesCard({ card}) {
    return(
        <li className='card'>
            <div className='card__discription'>
                <div className='card__list'>
                    <h1 className='card__title'>
                    {card.nameRU}
                    </h1>
                    <p className='card__duration'>
                    {convertDuration(card.duration)}
                    </p>
                </div>
                <button type='button' 
                className='card__like-active'
                ></button>
            </div>
            <a 
            target='_blank'
            href={card.trailerLink}
            className="card__link-image" rel="noreferrer">
                <img className='card__image' 
                src={getFullImageUrl(card.image)}
                alt={card.nameRU}
                />
             </a>
        </li>
    )
}

export default MoviesCard;