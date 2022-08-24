import React from 'react';

import './MoviesCard.css';

import convertDuration from '../../utils/convertDuration';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';





function MoviesCard({ item, onLikeClick, onDeleteClick, saved}) {
    const currentUser = React.useContext(CurrentUserContext);

    // console.log(item, 'moviesCard')
    const location  = useLocation();
    const handleSaveMovie = () => {
        onLikeClick(item)
    }

    const handleDeleteSaveMovie = () => {
        onDeleteClick(item)
    }
    

    // const isOwn = item.owner === currentUser._id;

    // console.log(isOwn);

    // console.log(item.id, 'id')
    // console.log(saved? 'card__like-active' : 'card__like')
    // console.log(saved ? handleDeleteSaveMovie :  handleSaveMovie)


    
    return(
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
                    className={ saved? 'card__like-active' : 'card__like'}
                    onClick={saved ? handleDeleteSaveMovie :  handleSaveMovie}
                    >
                    

                    </button>
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
                <img className='card__image' 
                src={item.image}
                alt={item.nameRU}
                />
             </a>
        </li>
    )
}

export default MoviesCard;