import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({cards, filter,
width
}) {

    const [index, setIndex] = React.useState(7);

    const fullScreen = width > 768;
    const mediumScreen = width <= 768 && width >= 480;
    const smallScreen = width < 480;


    React.useEffect(() => {
        if (fullScreen) {
          setIndex(7);
        }
        if (mediumScreen) {
          setIndex(7);
        }
        if (smallScreen) {
          setIndex(5);
        }
      }, [width]);


    const movieFilter = cards.filter((card) => card.duration <= 40);
    const cardsToRender = filter ? movieFilter.slice(0, index) : cards.slice(0, index);

    
    const uploadingCards = () => {
        if (smallScreen) {
            setIndex(index + 5)
        } else {
            setIndex(index + 7)
        }
    }

    const isDisabled = () => {
        return index > cardsToRender.length
    }
    console.log(cardsToRender)
return(
    <>
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

        <div className='movies__container'>
                <button className={`movies__button 
                ${index > cardsToRender.length ? 'movies__button_hidden' : ''}
                `}
                 type='button'
                 onClick={uploadingCards}
                 disabled={isDisabled()}
                 >Еще</button>
        </div>
    </>

    )
}

export default MoviesCardList;