import React from 'react';

import './MoviesCard.css';

import getFullImageUrl from '../../utils/getFullImageUrl';
import convertDuration from '../../utils/convertDuration';



function MoviesCard({ item}) {

    const likeStatus = true;

    console.log()

    const cardLikeButtonClassName = `card__like ${
        likeStatus ? "card__like-active " : ""
      }`;
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
                <button type='button' 
                className={cardLikeButtonClassName}
                ></button>
            </div>
            <a 
            target='_blank'
            href={item.trailerLink}
            className="card__link-image" rel="noreferrer">
                <img className='card__image' 
                src={getFullImageUrl(item.image)}
                alt={item.nameRU}
                />
             </a>
        </li>
    )
}

export default MoviesCard;