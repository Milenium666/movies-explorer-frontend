import React from 'react';
import './MoviesCardList.css';


function MoviesCardList({children}) {
    return(
        <ul className='cards'>
           {children}
        </ul>
    )
}

export default MoviesCardList;