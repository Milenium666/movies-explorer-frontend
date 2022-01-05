import React from 'react';
import './MoviesCard.css';

function MoviesCard({ title, durationFilm, classIcon, img}) {
    return(
        <li className='card'>
            <div className='card__discription'>
                <div className='card__list'>
                    <h1 className='card__title'>{title}</h1>
                    <p className='card__duration'>{durationFilm}</p>
                </div>
                <button type='button' className={classIcon}></button>
            </div>
            <img className='card__image' src={img} alt='картинка фильма'/>
        </li>
    )
}

export default MoviesCard;