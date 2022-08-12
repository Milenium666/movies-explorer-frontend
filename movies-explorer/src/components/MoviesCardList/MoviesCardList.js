import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({cards, filter}) {

    

    const [index, setIndex] = React.useState();

    const movieFilter = cards.filter((card) => card.duration <= 40);
    

    const cardsToRender = filter ? movieFilter.slice(0, index) : cards.slice(0, index);
    

    return(
        <ul className='cards'>
            {
            cardsToRender.map
            ((card) => (
                <MoviesCard 
                card={card}
                key={card.id}
                />
))}

        </ul>
    )
}

export default MoviesCardList;