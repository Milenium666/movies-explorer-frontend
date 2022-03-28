import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({
    // children,
     cards}) {
    return(
        <ul className='cards'>
           {/* {children} */}
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