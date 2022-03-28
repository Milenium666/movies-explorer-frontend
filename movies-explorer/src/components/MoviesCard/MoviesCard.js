import React from 'react';
import './MoviesCard.css';
/*
Изображения приходят с сервера с относительным, а не абсолютным URL. Не забудьте добавить к ним URL сервера — https://api.nomoreparties.co/.
 */






function MoviesCard({ 
    // title, durationFilm, classIcon, img
card
}) {
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
                    {card.duration}
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
            >
                <img className='card__image' 
                // src={img}
                src={card.image.url}
                alt={card.nameRU}
                // alt='картинка фильма'
                />
             </a>
        </li>
    )
}

export default MoviesCard;