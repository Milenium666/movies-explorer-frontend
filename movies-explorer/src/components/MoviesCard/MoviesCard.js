import React from 'react';
import './MoviesCard.css';

function MoviesCard({ title, durationFilm, className, img}) {
    return(
        <li className='card'>
            <div className='card__discription'>
                <h1 className='card__title'>{title}</h1>
                <p className='card__duration'>{durationFilm}</p>
                <button type='button' className={className}></button>
            </div>
            <img className='card__image' src={img} alt='картинка фильма'/>
        </li>
    )
}

export default MoviesCard;