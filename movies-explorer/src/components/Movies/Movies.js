import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import MoviesCard from '../MoviesCard/MoviesCard';

import card1 from '../../images/card-1.png';
import card2 from '../../images/card-2.png';
import card3 from '../../images/card-3.png';
import card4 from '../../images/card-4.png';
import card5 from '../../images/card-5.png';
import card6 from '../../images/card-6.png';
import card7 from '../../images/card-7.png';





function Movies() {
    return(
        <section className='movies'>
            <SearchForm />
            <MoviesCardList>
                <MoviesCard title='33 слова о дизайне' durationFilm='1ч 42м' classIcon='card__like_active' img={card1}/>
                <MoviesCard title='Киноальманах «100 лет дизайна»' durationFilm='1ч 42м'  classIcon='card__like_active' img={card2}/>
                <MoviesCard title='В погоне за Бенкси' durationFilm='1ч 42м' classIcon='card__like' img={card3}/>
                <MoviesCard title='Баския: Взрыв реальности' durationFilm='1ч 42м' classIcon='card__like' img={card4}/>
                <MoviesCard title='Бег это свобода' durationFilm='1ч 42м' classIcon='card__like_active' img={card5}/>
                <MoviesCard title='Книготорговцы' durationFilm='1ч 42м' classIcon='card__like' img={card6}/>
                <MoviesCard title='Когда я думаю о Германии ночью' durationFilm='1ч 42м' classIcon='card__like' img={card7}/>
            </MoviesCardList>
            <Preloader />
        </section>
    )
}

export default Movies;