import React from 'react';
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

import card1 from '../../images/card-1.png';
import card2 from '../../images/card-2.png';
import card3 from '../../images/card-3.png';


function SavedMovies() {
    return(
        <section className='saved-movies'>
            <SearchForm />
            <MoviesCardList>
                <MoviesCard title='33 слова о дизайне' durationFilm='1ч 42м' classIcon='card__delete-saved-film' img={card1}/>
                <MoviesCard title='Киноальманах «100 лет дизайна»' durationFilm='1ч 42м' classIcon='card__delete-saved-film' img={card2}/>
                <MoviesCard title='В погоне за Бенкси' durationFilm='1ч 42м' classIcon='card__delete-saved-film' img={card3}/>
            </MoviesCardList>
        </section>
    )
}

export default SavedMovies;