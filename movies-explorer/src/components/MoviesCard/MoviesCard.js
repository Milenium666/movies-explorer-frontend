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
                        {/* {title} */}
                    {card.nameRU}
                    </h1>
                    <p className='card__duration'>
                        {/* {durationFilm} */}
                    {convertDuration(card.duration)}
                    </p>
                </div>
                <button type='button' 
                // className={classIcon}
                className='card__like'
                ></button>
            </div>
            <a 
            // href='https://www.youtube.com/' 
            target='_blank'
            href={card.trailerLink}
            className="card__link-image"

            >
                <img className='card__image' 
                // src={img}
                src={getFullImageUrl(card.image)}
                // src={card.image.url}
                alt={card.nameRU}
                // alt='картинка фильма'
                />
             </a>
        </li>
    )
}

export default MoviesCard;