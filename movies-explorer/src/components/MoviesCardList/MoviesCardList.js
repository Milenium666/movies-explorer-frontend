import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({cards
                            // ,filter
}) {
    // const movieFilter = cards.filter((card) => card.duration <= 40);
    return(
        <ul className='cards'>
            {cards.map((card) => (
                <MoviesCard 
                card={card}
                key={card.id}
                />
            ))}

        </ul>
    )
}

export default MoviesCardList;